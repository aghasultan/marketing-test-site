import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { businessMetricsSchema, BusinessMetrics } from '../../types';
import { useWizard } from '../../context/WizardContext';
import { CurrencyInput } from '../../../../components/ui/currency-input';
import { Button } from '../../../../components/ui/button';

export const BusinessMetricsStep: React.FC = () => {
    const { state, dispatch } = useWizard();

    // Pre-fill metrics defaulting to sensible strings inside forms, but Zod enforces numbers
    const { register, control, handleSubmit, formState: { errors } } = useForm<BusinessMetrics>({
        resolver: zodResolver(businessMetricsSchema),
        defaultValues: {
            monthlyRevenue: state.data.monthlyRevenue || undefined, // undefined to trigger min 0 error 
            cac: state.data.cac || undefined,
            ltv: state.data.ltv || undefined,
            consentGiven: state.data.consentGiven || false,
        }
    });

    const onSubmit = (data: BusinessMetrics) => {
        // Submit will dispatch NEXT_STEP which applies the qualification business rule
        dispatch({ type: 'NEXT_STEP', payload: data });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-2">Growth Diagnostics</h2>
                <p className="text-zinc-400">Share your core metrics so we can determine if our scaling framework stringently fits your current stage.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Average Monthly Revenue (MRR)</label>
                        <Controller
                            control={control}
                            name="monthlyRevenue"
                            render={({ field }) => (
                                <CurrencyInput
                                    value={field.value}
                                    onChange={(val) => field.onChange(val)}
                                    placeholder="$80,000"
                                />
                            )}
                        />
                        {errors.monthlyRevenue && <p className="text-xs text-red-400">{errors.monthlyRevenue.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Target CAC <span className="text-zinc-500">(Optional)</span></label>
                            <Controller
                                control={control}
                                name="cac"
                                render={({ field }) => (
                                    <CurrencyInput
                                        value={field.value}
                                        onChange={(val) => field.onChange(val)}
                                        placeholder="$500"
                                    />
                                )}
                            />
                            {errors.cac && <p className="text-xs text-red-400">{errors.cac.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Estimated LTV <span className="text-zinc-500">(Optional)</span></label>
                            <Controller
                                control={control}
                                name="ltv"
                                render={({ field }) => (
                                    <CurrencyInput
                                        value={field.value}
                                        onChange={(val) => field.onChange(val)}
                                        placeholder="$5,000"
                                    />
                                )}
                            />
                            {errors.ltv && <p className="text-xs text-red-400">{errors.ltv.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Consent Checkbox */}
                <div className="pt-4 pb-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="flex-shrink-0 mt-0.5">
                            <input
                                type="checkbox"
                                {...register('consentGiven')}
                                className="w-4 h-4 rounded border-white/20 bg-zinc-900/50 text-blue-500 focus:ring-blue-500/50 cursor-pointer"
                            />
                        </div>
                        <span className="text-sm text-zinc-400 leading-relaxed">
                            I agree to the processing of my data for the purpose of qualification and generating my growth strategy. (GDPR/CCPA compliant)
                        </span>
                    </label>
                    {errors.consentGiven && <p className="text-xs text-red-400 mt-2">{errors.consentGiven.message}</p>}
                </div>

                <div className="flex gap-4 pt-4">
                    <Button
                        type="button"
                        variant="secondary"
                        className="w-1/3 text-zinc-300 hover:text-white"
                        onClick={() => dispatch({ type: 'PREV_STEP' })}
                    >
                        Back
                    </Button>
                    <Button type="submit" variant="default" className="flex-1">
                        View Qualification Results
                    </Button>
                </div>
            </form>
        </motion.div>
    );
};
