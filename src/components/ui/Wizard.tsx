import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, ChevronRight, ChevronLeft, Send } from 'lucide-react';

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

// Helper component for inputs with validation
const WizardInput = ({
  label,
  register,
  error,
  type = "text",
  placeholder,
  isValid
}: {
  label: string,
  register: any,
  error?: any,
  type?: string,
  placeholder?: string,
  isValid?: boolean
}) => (
  <div className="form-group relative">
    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">{label}</label>
    <div className="relative">
      <input
        type={type}
        {...register}
        className={clsx(
          "w-full bg-slate-800/50 border rounded-lg p-4 text-white placeholder-slate-500 focus:ring-2 outline-none transition-all pr-12",
          error
            ? "border-red-500/50 focus:ring-red-500/20 focus:border-red-500"
            : isValid
              ? "border-emerald-500/50 focus:ring-emerald-500/20 focus:border-emerald-500"
              : "border-white/10 focus:ring-emerald-500/50 focus:border-emerald-500/50"
        )}
        placeholder={placeholder}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        {error && <AlertCircle className="w-5 h-5 text-red-500" />}
        {!error && isValid && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
      </div>
    </div>
    {error && (
      <motion.span
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-400 text-xs mt-1 block flex items-center gap-1"
      >
        {error.message}
      </motion.span>
    )}
  </div>
);

export const Wizard = () => {
  const [step, setStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [direction, setDirection] = useState(0);
  const [shake, setShake] = useState(0);

  const {
    register,
    handleSubmit,
    trigger,
    getFieldState,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onChange', // Real-time validation for checkmarks
  });

  const nextStep = async () => {
    const fields = steps[step];
    const output = await trigger(fields as any);
    if (output) {
      setDirection(1);
      setStep((prev) => prev + 1);
    } else {
      setShake(prev => prev + 1); // Trigger shake
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log("Submitting:", data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSuccess(true);
  };

  const isFieldValid = (fieldName: keyof FormData) => {
    const { invalid, isDirty, isTouched } = getFieldState(fieldName);
    return !invalid && (isDirty || isTouched);
  };

  if (isSuccess) {
    return (
      <div className="wizard-container fade-in">
        <div className="text-center p-8 glass-panel rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20"
          >
            <CheckCircle2 className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-4">Application Received!</h2>
          <p className="text-slate-300">I'll review your details and get back to you within 24 hours.</p>
        </div>
      </div>
    );
  }

  const progress = ((step + 1) / steps.length) * 100;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      className="relative backdrop-blur-xl bg-slate-900/40 border border-white/10 rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto overflow-hidden"
      animate={{ x: shake % 2 === 0 ? 0 : [0, -10, 10, -10, 10, 0] }}
      transition={{ duration: 0.4 }}
    >
      {/* Decorative gradients */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Progress */}
      <div className="flex justify-between items-end mb-6 relative z-10">
        <div>
          <h2 className="text-sm font-mono text-emerald-400 mb-1">Step {step + 1} of {steps.length}</h2>
          <div className="text-xl font-bold text-white">
            {step === 0 && "Contact Details"}
            {step === 1 && "Business Context"}
            {step === 2 && "The Vision"}
          </div>
        </div>
        <div className="text-slate-500 text-xs">
          Next: {step === 0 ? "Context" : step === 1 ? "Vision" : "Finish"}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full bg-slate-800/50 h-1 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
        <AnimatePresence mode='wait' custom={direction}>
          {step === 0 && (
            <motion.fieldset
              key="step0"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <WizardInput
                label="Name"
                register={register('name')}
                error={errors.name}
                isValid={isFieldValid('name')}
                placeholder="Your Name"
              />
              <WizardInput
                label="Email"
                register={register('email')}
                error={errors.email}
                type="email"
                isValid={isFieldValid('email')}
                placeholder="you@example.com"
              />
              <WizardInput
                label="Website"
                register={register('website')}
                error={errors.website}
                type="url"
                isValid={isFieldValid('website')}
                placeholder="https://example.com"
              />
            </motion.fieldset>
          )}

          {step === 1 && (
            <motion.fieldset
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="form-group relative">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Monthly Ad Spend</label>
                <div className="relative">
                  <select
                    {...register('monthlySpend')}
                    className={clsx(
                      "w-full bg-slate-800/50 border rounded-lg p-4 text-white focus:ring-2 outline-none transition-all appearance-none",
                      errors.monthlySpend ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                    )}
                  >
                    <option value="" className="bg-slate-900">Select range...</option>
                    <option value="under_10k" className="bg-slate-900">Under $10k/mo</option>
                    <option value="10k_50k" className="bg-slate-900">$10k - $50k/mo</option>
                    <option value="50k_plus" className="bg-slate-900">$50k+/mo</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {errors.monthlySpend ? <AlertCircle className="w-5 h-5 text-red-500" /> : isFieldValid('monthlySpend') && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  </div>
                </div>
                {errors.monthlySpend && <span className="text-red-400 text-xs mt-1 block">{errors.monthlySpend.message}</span>}
              </div>

              <div className="form-group relative">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Primary Goal</label>
                <div className="relative">
                  <select
                    {...register('primaryGoal')}
                    className={clsx(
                      "w-full bg-slate-800/50 border rounded-lg p-4 text-white focus:ring-2 outline-none transition-all appearance-none",
                      errors.primaryGoal ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                    )}
                  >
                    <option value="" className="bg-slate-900">Select goal...</option>
                    <option value="scale" className="bg-slate-900">Aggressive Scale (ROAS &gt; 2)</option>
                    <option value="tracking" className="bg-slate-900">Fix Tracking & Attribution</option>
                    <option value="full_funnel" className="bg-slate-900">Full Funnel Buildout</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {errors.primaryGoal ? <AlertCircle className="w-5 h-5 text-red-500" /> : isFieldValid('primaryGoal') && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  </div>
                </div>
                {errors.primaryGoal && <span className="text-red-400 text-xs mt-1 block">{errors.primaryGoal.message}</span>}
              </div>
            </motion.fieldset>
          )}

          {step === 2 && (
            <motion.fieldset
              key="step2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="form-group">
                <textarea
                  {...register('vision')}
                  rows={5}
                  className={clsx(
                    "w-full bg-slate-800/50 border rounded-lg p-4 text-white placeholder-slate-500 focus:ring-2 outline-none transition-all resize-none",
                    errors.vision ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                  )}
                  placeholder="Tell us a bit about your current bottleneck..."
                />
                {errors.vision && <span className="text-red-400 text-xs mt-1 block">{errors.vision.message}</span>}
              </div>
            </motion.fieldset>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="flex justify-between pt-6 border-t border-white/10 mt-8">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 0 || isSubmitting}
            className={clsx(
              "px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2",
              step === 0 ? "invisible" : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white rounded-lg font-bold shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              Next Step <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white rounded-lg font-bold shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? "Sending..." : "Submit Application"} <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};
