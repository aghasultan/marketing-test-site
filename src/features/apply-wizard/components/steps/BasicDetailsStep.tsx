import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { basicDetailsSchema, BasicDetails } from '../../types';
import { useWizard } from '../../context/WizardContext';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';

export const BasicDetailsStep: React.FC = () => {
    const { state, dispatch } = useWizard();

    // Initialize form with persisted state
    const { register, handleSubmit, formState: { errors } } = useForm<BasicDetails>({
        resolver: zodResolver(basicDetailsSchema),
        defaultValues: {
            firstName: state.data.firstName || '',
            lastName: state.data.lastName || '',
            companyName: state.data.companyName || '',
            email: state.data.email || '',
        }
    });

    const onSubmit = (data: BasicDetails) => {
        // Validation passes
        dispatch({ type: 'NEXT_STEP', payload: data });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
        >
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-2">Let's start with the basics</h2>
                <p className="text-zinc-400">Tell us a bit about yourself and your company.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">First Name</label>
                        <Input
                            {...register('firstName')}
                            placeholder="Alex"
                            className="bg-zinc-900/50 border-white/10"
                            aria-invalid={!!errors.firstName}
                        />
                        {errors.firstName && <p className="text-xs text-red-400">{errors.firstName.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Last Name</label>
                        <Input
                            {...register('lastName')}
                            placeholder="Founder"
                            className="bg-zinc-900/50 border-white/10"
                            aria-invalid={!!errors.lastName}
                        />
                        {errors.lastName && <p className="text-xs text-red-400">{errors.lastName.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Company Name</label>
                    <Input
                        {...register('companyName')}
                        placeholder="CloudOps Ltd."
                        className="bg-zinc-900/50 border-white/10"
                        aria-invalid={!!errors.companyName}
                    />
                    {errors.companyName && <p className="text-xs text-red-400">{errors.companyName.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Work Email</label>
                    <Input
                        type="email"
                        {...register('email')}
                        placeholder="alex@cloudops.com"
                        className="bg-zinc-900/50 border-white/10"
                        aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                </div>

                <div className="pt-4">
                    <Button type="submit" variant="default" className="w-full">
                        Continue to Metrics
                    </Button>
                </div>
            </form>
        </motion.div>
    );
};
