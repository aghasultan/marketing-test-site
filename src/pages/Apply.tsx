import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trackEvent } from '../lib/tracking';
import { ApplyFormSchema, ApplyFormValues, TOTAL_STEPS, SERVICE_TYPES } from '../features/apply/types';
import { useWizardStore } from '../features/apply/stores/wizardStore';
import { WizardLayout } from '../features/apply/components/WizardLayout';
import { ReviewStep } from '../features/apply/components/ReviewStep';
import { SuccessStep } from '../features/apply/components/SuccessStep';

export function Apply() {
  const currentStep = useWizardStore((state) => state.currentStep);
  const setStep = useWizardStore((state) => state.setStep);
  const goBack = useWizardStore((state) => state.goBack);

  // Computed
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === TOTAL_STEPS;
  const totalSteps = TOTAL_STEPS;

  const nextStep = () => setStep(currentStep + 1);
  const prevStep = () => goBack();
  const goToStep = (step: number) => setStep(step);

  useEffect(() => {
    // Optional: Reset on mount if we want fresh state every time we visit /apply
    // For "preserve state" test, verifying layout persistence is key.
    // However, if the store persists to localStorage, "fresh state" might break "resume" feature.
    // But since the test expects fresh state on new browser context (it's new context),
    // localStorage is empty. So it defaults to 1.
    // If we navigate away and back, we might want to resume.
    // So let's NOT search reset here unless needed.
  }, []);

  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(ApplyFormSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      email: '',
      companyName: '',
      industry: undefined,
      revenueRange: '<10k', // Default
      serviceType: undefined,
      monthlyBudget: '<10k',
      targetRoas: '',
      techStack: '',
      trackingIssues: '',
    }
  });

  const { formState: { errors } } = form;

  const industry = form.watch('industry');

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isValidating, setIsValidating] = React.useState(false);
  const topRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (industry !== 'Other') {
      form.setValue('customIndustry', undefined);
    }
  }, [industry, form]);

  // Scroll to top and focus first input on step change
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Focus the first input/select/textarea in the form after a small delay to allow animation
    setTimeout(() => {
      const firstInput = document.querySelector<HTMLElement>('form input:not([type="hidden"]), form select, form textarea');
      firstInput?.focus();
    }, 400); // Wait for exit animation
  }, [currentStep, isSuccess]);


  const onSubmit = async (data: ApplyFormValues) => {
    setIsSubmitting(true);
    console.log('Form Submitted:', data);

    // Track event
    trackEvent('form_submit', {
      form_name: 'apply_wizard',
      service_type: data.serviceType,
      industry: data.industry,
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    // alert('Application Submitted Successfully!\n' + JSON.stringify(data, null, 2));
  };

  const handleNext = async () => {
    if (isValidating) return;
    setIsValidating(true);
    let fieldsToValidate: (keyof ApplyFormValues)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['firstName', 'email', 'website'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['companyName', 'industry', 'revenueRange', 'goals', 'serviceType'];
      if (industry === 'Other') {
        const customIndustry = form.getValues('customIndustry');
        if (!customIndustry || customIndustry.trim() === '') {
          form.setError('customIndustry', {
            type: 'manual',
            message: 'Please specify your industry'
          });
          setIsValidating(false);
          return;
        }
        fieldsToValidate.push('customIndustry');
      }
    } else if (currentStep === 3) {
      const serviceType = form.getValues('serviceType');
      if (serviceType === SERVICE_TYPES.PAID_ADVERTISING) {
        fieldsToValidate = ['monthlyBudget'];
      }
      // Data analytics fields are optional, so no mandatory validation needed unless requirement changes
    }

    const isValid = await form.trigger(fieldsToValidate);
    setIsValidating(false);

    if (isValid) {
      nextStep();
    }
  };

  if (isSuccess) {
    return (
      <div ref={topRef}>
        <WizardLayout
          currentStep={totalSteps} // Or a completed state if supported
          totalSteps={totalSteps}
          title=""
          description=""
        >
          <SuccessStep />
        </WizardLayout>
      </div>
    );
  }

  return (
    <div ref={topRef}>
      <WizardLayout
        currentStep={currentStep}
        totalSteps={totalSteps}
        title="Apply for Partnership"
        description="Let's see if we're a good fit."
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Contact Info</h2>
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-zinc-400">First Name</label>
                <input
                  id="firstName"
                  {...form.register('firstName')}
                  className={`w-full rounded-md border bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 ${errors.firstName
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-white/10 focus:border-emerald-500 focus:ring-emerald-500'
                    }`}
                  placeholder="Jane"
                />
                {errors.firstName && (
                  <div className="mt-1 flex items-center gap-1 text-sm text-red-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errors.firstName.message}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-400">Email</label>
                <input
                  id="email"
                  {...form.register('email')}
                  type="email"
                  className={`w-full rounded-md border bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 ${errors.email
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-white/10 focus:border-emerald-500 focus:ring-emerald-500'
                    }`}
                  placeholder="jane@example.com"
                />
                {errors.email && (
                  <div className="mt-1 flex items-center gap-1 text-sm text-red-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errors.email.message}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="website" className="mb-2 block text-sm font-medium text-zinc-400">Website (Optional)</label>
                <input
                  id="website"
                  {...form.register('website')}
                  className="w-full rounded-md border border-white/10 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="https://example.com"
                />
                {errors.website && (
                  <div className="mt-1 flex items-center gap-1 text-sm text-red-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errors.website.message}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Business Details</h2>
              <div>
                <label htmlFor="companyName" className="mb-2 block text-sm font-medium text-zinc-400">Company Name</label>
                <input
                  id="companyName"
                  {...form.register('companyName')}
                  className={`w-full rounded-md border bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 ${errors.companyName
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-white/10 focus:border-emerald-500 focus:ring-emerald-500'
                    }`}
                  placeholder="Acme Inc."
                />
                {errors.companyName && (
                  <div className="mt-1 flex items-center gap-1 text-sm text-red-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errors.companyName.message}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="industry" className="mb-2 block text-sm font-medium text-zinc-400">Industry</label>
                <select
                  id="industry"
                  {...form.register('industry')}
                  className={`w-full rounded-md border bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 ${errors.industry
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-white/10 focus:border-emerald-500 focus:ring-emerald-500'
                    }`}
                >
                  <option value="">Select an industry</option>
                  <option value="Tech">Tech</option>
                  <option value="Finance">Finance</option>
                  <option value="Health">Health</option>
                  <option value="Retail">Retail</option>
                  <option value="Other">Other</option>
                </select>
                {errors.industry && (
                  <div className="mt-1 flex items-center gap-1 text-sm text-red-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errors.industry.message}</span>
                  </div>
                )}
              </div>

              {industry === 'Other' && (
                <div>
                  <label htmlFor="customIndustry" className="mb-2 block text-sm font-medium text-zinc-400">Please Specify</label>
                  <input
                    id="customIndustry"
                    {...form.register('customIndustry')}
                    className={`w-full rounded-md border bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 ${errors.customIndustry
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-white/10 focus:border-emerald-500 focus:ring-emerald-500'
                      }`}
                    placeholder="e.g. Non-profit"
                  />
                  {errors.customIndustry && (
                    <div className="mt-1 flex items-center gap-1 text-sm text-red-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{errors.customIndustry.message}</span>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="revenueRange" className="mb-2 block text-sm font-medium text-zinc-400">Revenue Range</label>
                <select
                  id="revenueRange"
                  {...form.register('revenueRange')}
                  className="w-full rounded-md border border-white/10 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="<10k">&lt;10k</option>
                  <option value="10k-50k">10k-50k</option>
                  <option value="50k-200k">50k-200k</option>
                  <option value="200k+">200k+</option>
                </select>
              </div>

              <div>
                <label htmlFor="serviceType" className="mb-2 block text-sm font-medium text-zinc-400">Service Needed</label>
                <select
                  id="serviceType"
                  {...form.register('serviceType')}
                  className={`w-full rounded-md border bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 ${errors.serviceType
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-white/10 focus:border-emerald-500 focus:ring-emerald-500'
                    }`}
                >
                  <option value="">Select a service</option>
                  <option value={SERVICE_TYPES.PAID_ADVERTISING}>Paid Advertising</option>
                  <option value={SERVICE_TYPES.DATA_ANALYTICS}>Data & Analytics</option>
                </select>
                {errors.serviceType && (
                  <div className="mt-1 flex items-center gap-1 text-sm text-red-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errors.serviceType.message}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="goals" className="mb-2 block text-sm font-medium text-zinc-400">Goals (Optional)</label>
                <textarea
                  id="goals"
                  {...form.register('goals')}
                  className="w-full rounded-md border border-white/10 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="What are you hoping to achieve?"
                  rows={3}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Service Details</h2>

              {form.watch('serviceType') === SERVICE_TYPES.PAID_ADVERTISING && (
                <>
                  <div>
                    <label htmlFor="monthlyBudget" className="mb-2 block text-sm font-medium text-zinc-400">Monthly Ad Budget</label>
                    <select
                      id="monthlyBudget"
                      {...form.register('monthlyBudget')}
                      className="w-full rounded-md border border-white/10 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="<10k">&lt;10k</option>
                      <option value="10k-50k">10k-50k</option>
                      <option value="50k+">50k+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="targetRoas" className="mb-2 block text-sm font-medium text-zinc-400">Target ROAS (Optional)</label>
                    <input
                      id="targetRoas"
                      {...form.register('targetRoas')}
                      className="w-full rounded-md border border-white/10 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="e.g. 3.5x"
                    />
                  </div>
                </>
              )}

              {form.watch('serviceType') === SERVICE_TYPES.DATA_ANALYTICS && (
                <>
                  <div>
                    <label htmlFor="techStack" className="mb-2 block text-sm font-medium text-zinc-400">Current Tech Stack (Optional)</label>
                    <input
                      id="techStack"
                      {...form.register('techStack')}
                      className="w-full rounded-md border border-white/10 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="e.g. GA4, HubSpot, Shopify"
                    />
                  </div>
                  <div>
                    <label htmlFor="trackingIssues" className="mb-2 block text-sm font-medium text-zinc-400">Tracking Issues (Optional)</label>
                    <textarea
                      id="trackingIssues"
                      {...form.register('trackingIssues')}
                      className="w-full rounded-md border border-white/10 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Describe any current tracking or data issues..."
                      rows={3}
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <ReviewStep
              values={form.getValues()}
              onEdit={goToStep}
            />
          )}

          <div className="mt-8 flex justify-between border-t border-white/5 pt-6">
            <button
              type="button"
              onClick={prevStep}
              disabled={isFirstStep}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isFirstStep
                ? 'cursor-not-allowed opacity-0'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
            >
              Back
            </button>

            {isLastStep ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''
                  }`}
              >
                {isSubmitting && (
                  <svg className="h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={isValidating}
                className={`rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500 ${isValidating ? 'cursor-wait opacity-70' : ''}`}
              >
                {isValidating ? 'Checking...' : 'Next Step'}
              </button>
            )}
          </div>

        </form>
      </WizardLayout>
    </div>
  );
}
