import React from 'react';
import { ApplyFormValues } from '../types';

interface ReviewStepProps {
    values: ApplyFormValues;
    onEdit: (step: number) => void;
}

export function ReviewStep({ values, onEdit }: ReviewStepProps) {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Review Your Application</h2>
                <p className="text-zinc-400">Please verify your details before submitting.</p>
            </div>

            {/* Contact Info */}
            <div className="rounded-xl border border-white/5 bg-zinc-800/50 p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Contact Info</h3>
                    <button
                        type="button"
                        onClick={() => onEdit(1)}
                        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Edit
                    </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <p className="text-sm text-zinc-500">First Name</p>
                        <p className="text-white">{values.firstName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500">Email</p>
                        <p className="text-white">{values.email}</p>
                    </div>
                    {values.website && (
                        <div className="sm:col-span-2">
                            <p className="text-sm text-zinc-500">Website</p>
                            <p className="text-white">{values.website}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Business Details */}
            <div className="rounded-xl border border-white/5 bg-zinc-800/50 p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Business Details</h3>
                    <button
                        type="button"
                        onClick={() => onEdit(2)}
                        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Edit
                    </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <p className="text-sm text-zinc-500">Company Name</p>
                        <p className="text-white">{values.companyName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500">Industry</p>
                        <p className="text-white">
                            {values.industry === 'Other' ? values.customIndustry : values.industry}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500">Revenue Range</p>
                        <p className="text-white">{values.revenueRange}</p>
                    </div>
                    {values.goals && (
                        <div className="sm:col-span-2">
                            <p className="text-sm text-zinc-500">Goals</p>
                            <p className="text-white whitespace-pre-wrap">{values.goals}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
