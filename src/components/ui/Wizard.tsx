import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { clsx } from 'clsx';

export const applicationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  website: z.string().url("Must be a valid URL"),
  monthlySpend: z.enum(["under_10k", "10k_50k", "50k_plus"]),
  primaryGoal: z.enum(["scale", "tracking", "full_funnel"]),
  vision: z.string().min(10, "Tell us a bit more about your bottleneck")
});

type FormData = z.infer<typeof applicationSchema>;

const steps = [
  ['name', 'email', 'website'],
  ['monthlySpend', 'primaryGoal'],
  ['vision']
] as const;

export const Wizard = () => {
  const [step, setStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onBlur',
  });

  const nextStep = async () => {
    const fields = steps[step];
    const output = await trigger(fields as any);
    if (output) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormData) => {
    console.log("Submitting:", data);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="wizard-container fade-in">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-emerald-500 mb-4">Application Received!</h2>
          <p className="text-gray-300">I'll review your details and get back to you within 24 hours.</p>
        </div>
      </div>
    );
  }

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="wizard-container bg-slate-800 text-white rounded-xl border border-slate-700 p-6 shadow-xl max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="wizard-progress w-full bg-slate-700 h-2 rounded-full mb-8">
        <div
          className="wizard-progress-fill bg-emerald-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 0 && (
          <fieldset className="space-y-4 animate-slideIn">
            <legend className="text-xl font-bold border-b border-slate-700 pb-2 mb-4 w-full">
              Contact Details
            </legend>

            <div className="form-group">
              <label className="block text-sm font-medium mb-1 text-slate-300">Name</label>
              <input
                {...register('name')}
                className={clsx(
                  "w-full bg-slate-900 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors",
                  errors.name ? "border-red-500" : "border-slate-600 focus:border-emerald-500"
                )}
                placeholder="Your Name"
              />
              {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium mb-1 text-slate-300">Email</label>
              <input
                {...register('email')}
                type="email"
                className={clsx(
                  "w-full bg-slate-900 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors",
                  errors.email ? "border-red-500" : "border-slate-600 focus:border-emerald-500"
                )}
                placeholder="you@example.com"
              />
              {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium mb-1 text-slate-300">Website</label>
              <input
                {...register('website')}
                type="url"
                className={clsx(
                  "w-full bg-slate-900 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors",
                  errors.website ? "border-red-500" : "border-slate-600 focus:border-emerald-500"
                )}
                placeholder="https://example.com"
              />
              {errors.website && <span className="text-red-500 text-xs mt-1 block">{errors.website.message}</span>}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="space-y-4 animate-slideIn">
            <legend className="text-xl font-bold border-b border-slate-700 pb-2 mb-4 w-full">
              Business Context
            </legend>

            <div className="form-group">
              <label className="block text-sm font-medium mb-1 text-slate-300">Monthly Ad Spend</label>
              <select
                {...register('monthlySpend')}
                className={clsx(
                  "w-full bg-slate-900 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors",
                  errors.monthlySpend ? "border-red-500" : "border-slate-600 focus:border-emerald-500"
                )}
              >
                <option value="">Select range...</option>
                <option value="under_10k">Under $10k/mo</option>
                <option value="10k_50k">$10k - $50k/mo</option>
                <option value="50k_plus">$50k+/mo</option>
              </select>
              {errors.monthlySpend && <span className="text-red-500 text-xs mt-1 block">{errors.monthlySpend.message}</span>}
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium mb-1 text-slate-300">Primary Goal</label>
              <select
                {...register('primaryGoal')}
                className={clsx(
                  "w-full bg-slate-900 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors",
                  errors.primaryGoal ? "border-red-500" : "border-slate-600 focus:border-emerald-500"
                )}
              >
                <option value="">Select goal...</option>
                <option value="scale">Aggressive Scale (ROAS &gt; 2)</option>
                <option value="tracking">Fix Tracking & Attribution</option>
                <option value="full_funnel">Full Funnel Buildout</option>
              </select>
              {errors.primaryGoal && <span className="text-red-500 text-xs mt-1 block">{errors.primaryGoal.message}</span>}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="space-y-4 animate-slideIn">
            <legend className="text-xl font-bold border-b border-slate-700 pb-2 mb-4 w-full">
              The Vision
            </legend>

            <div className="form-group">
              <label className="block text-sm font-medium mb-1 text-slate-300">What's holding you back?</label>
              <textarea
                {...register('vision')}
                rows={5}
                className={clsx(
                  "w-full bg-slate-900 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors",
                  errors.vision ? "border-red-500" : "border-slate-600 focus:border-emerald-500"
                )}
                placeholder="Tell us a bit about your current bottleneck..."
              />
              {errors.vision && <span className="text-red-500 text-xs mt-1 block">{errors.vision.message}</span>}
            </div>
          </fieldset>
        )}

        {/* Controls */}
        <div className="flex justify-between pt-6 border-t border-slate-700 mt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 0 || isSubmitting}
            className={clsx(
              "px-6 py-2 rounded-lg font-semibold transition-colors",
              step === 0 ? "invisible" : "text-slate-400 hover:text-white hover:bg-slate-700"
            )}
          >
            Back
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Submit Application"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
