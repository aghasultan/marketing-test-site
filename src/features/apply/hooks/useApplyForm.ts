import { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWizardStore } from '../stores/wizardStore';
import { ApplyFormSchema, ApplyFormData } from '../types';
import { debounce } from 'lodash';

export const useApplyForm = () => {
    const { formData, updateFormData } = useWizardStore();

    const form = useForm<ApplyFormData>({
        resolver: zodResolver(ApplyFormSchema),
        defaultValues: formData,
        mode: 'onChange'
    });

    // Use subscription to avoid re-renders and potential infinite loops
    // Use subscription to avoid re-renders and potential infinite loops
    useEffect(() => {
        const debouncedUpdate = debounce((value: Partial<ApplyFormData>) => {
            updateFormData(value);
        }, 500);

        const subscription = form.watch((value) => {
            debouncedUpdate(value as Partial<ApplyFormData>);
        });

        return () => {
            subscription.unsubscribe();
            debouncedUpdate.cancel();
        };
    }, [form, updateFormData]);

    return form;
};
