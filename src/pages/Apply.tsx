import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApplyFormSchema, ApplyFormValues } from '../features/apply/types';
import { useWizard } from '../features/apply/hooks/useWizard';
import { WizardLayout } from '../features/apply/components/WizardLayout';
import { ReviewStep } from '../features/apply/components/ReviewStep';
import { SuccessStep } from '../features/apply/components/SuccessStep';

export function Apply() {
  const { currentStep, nextStep, prevStep, totalSteps, isFirstStep, isLastStep, goToStep } = useWizard(3);
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

  // Scroll to top on step change and success
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentStep, isSuccess]);

  const onSubmit = async (data: ApplyFormValues) => {
    setIsSubmitting(true);
    console.log('Form Submitted:', data);

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
      fieldsToValidate = ['companyName', 'industry', 'revenueRange', 'goals'];
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
                <label className="mb-2 block text-sm font-medium text-zinc-400">First Name</label>
                <input
                  {...form.register('firstName')}
                  className={`w-full rounded-md border bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 ${errors.firstName
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-white/10 focus:border-emerald-500 focus:ring-emerald-500'
                    }`}
                  placeholder="Jane"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Email</label>
                <input
                  {...form.register('email')}
                  type="email"
                  className={`w-full rounded-md border bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 ${errors.email
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-white/10 focus:border-emerald-500 focus:ring-emerald-500'
                    }`}
                  placeholder="jane@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Website (Optional)</label>
                <input
                  {...form.register('website')}
                  className="w-full rounded-md border border-white/10 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="https://example.com"
                />
                {errors.website && (
                  <p className="mt-1 text-sm text-red-400">{errors.website.message}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Business Details</h2>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Company Name</label>
                <input
                  {...form.register('companyName')}
                  className={`w-full rounded-md border bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 ${errors.companyName
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-white/10 focus:border-emerald-500 focus:ring-emerald-500'
                    }`}
                  placeholder="Acme Inc."
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-400">{errors.companyName.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Industry</label>
                <select
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
                  <p className="mt-1 text-sm text-red-400">{errors.industry.message}</p>
                )}
              </div>

              {industry === 'Other' && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-400">Please Specify</label>
                  <input
                    {...form.register('customIndustry')}
                    className="w-full rounded-md border border-white/10 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="e.g. Non-profit"
                  />
                  {errors.customIndustry && (
                    <p className="mt-1 text-sm text-red-400">{errors.customIndustry.message}</p>
                  )}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-400">Revenue Range</label>
                <select
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
                <label className="mb-2 block text-sm font-medium text-zinc-400">Goals (Optional)</label>
                <textarea
                  {...form.register('goals')}
                  className="w-full rounded-md border border-white/10 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="What are you hoping to achieve?"
                  rows={3}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
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
