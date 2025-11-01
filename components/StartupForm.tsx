'use client'

import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor'
import { Send } from 'lucide-react'
import { formSchema } from '@/lib/validation'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createPitch } from '@/lib/actions'

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pitch, setPitch] = useState('**Hello world!!**')
  const router  = useRouter()

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
        const formValues = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            category: formData.get('category') as string,
            link: formData.get('link') as string,
            pitch,
        }

        await formSchema.parseAsync(formValues);
        const result = await createPitch(prevState, formData, pitch)

        if(result.status == 'SUCCESS') {
          toast.success("Your startup pitch has been created successfully")
        }

        router.push(`/startup/${result._id}`)

        return result;
    } catch (error) {
        if(error instanceof z.ZodError) {
          const fieldErrors = error.flatten().fieldErrors;
          setErrors(fieldErrors as unknown as Record<string, string>)
          
          toast.error("Please check your inputs and try again")

          return { ...prevState, error: 'Validation failed', status: 'ERROR'}
        }
        toast.error("An unexprected error has occurred")
        return {
          ...prevState,
          error: 'An unexprected error has occurred',
          status: 'ERROR'
        }
    } 
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {error: '', status:'INITIAL'});



  return (
    <form action={formAction} className="space-y-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
      {/* Title */}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-semibold tracking-wide uppercase text-zinc-700 dark:text-zinc-300">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="text-base border-2 border-zinc-300 dark:border-zinc-700 rounded-xl p-4 font-medium focus:ring-2 focus:ring-teal-500 focus-visible:outline-none transition-all"
          required
          placeholder="Enter your startup title"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-semibold tracking-wide uppercase text-zinc-700 dark:text-zinc-300">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="text-base border-2 border-zinc-300 dark:border-zinc-700 rounded-xl p-4 font-medium min-h-[130px] focus:ring-2 focus:ring-teal-500 focus-visible:outline-none transition-all"
          required
          placeholder="Describe your startup in a few sentences..."
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-semibold tracking-wide uppercase text-zinc-700 dark:text-zinc-300">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="text-base border-2 border-zinc-300 dark:border-zinc-700 rounded-xl p-4 font-medium focus:ring-2 focus:ring-teal-500 focus-visible:outline-none transition-all"
          required
          placeholder="Tech, Health, Education..."
        />
        {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
      </div>

      {/* Image URL */}
      <div className="space-y-2">
        <label htmlFor="link" className="text-sm font-semibold tracking-wide uppercase text-zinc-700 dark:text-zinc-300">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="text-base border-2 border-zinc-300 dark:border-zinc-700 rounded-xl p-4 font-medium focus:ring-2 focus:ring-teal-500 focus-visible:outline-none transition-all"
          required
          placeholder="https://example.com/startup-image.png"
        />
        {errors.link && <p className="text-sm text-red-500">{errors.link}</p>}
      </div>

      {/* Pitch (Markdown Editor) */}
      <div className="space-y-2" data-color-mode="light">
        <label htmlFor="pitch" className="text-sm font-semibold tracking-wide uppercase text-zinc-700 dark:text-zinc-300">
          Pitch
        </label>
        <div className="border-2 border-zinc-300 dark:border-zinc-700 rounded-xl overflow-hidden">
          <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value || '')}
            id='pitch'
            height={300}
            preview="edit"
            style={{borderRadius: 20, overflow: 'hidden'}}
            textareaProps={{
                placeholder: 
                "Briefly describe your idea and what problem it solves"
            }}
            previewOptions={{
                disallowedElements: ["style"],
            }}
          />
        </div>
        {errors.pitch && <p className="text-sm text-red-500">{errors.pitch}</p>}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="flex justify-center w-full py-3 px-4 rounded-xl bg-teal-600 text-white font-semibold tracking-wide hover:bg-teal-700 transition-all focus:ring-2 focus:ring-teal-400 focus:outline-none"
            disabled={isPending}
        >
          {isPending ? 'Submitting ...' : 'Submit your Pitch'}
          <Send className="size-6 ml-2" />
        </button>
      </div>
    </form>
  )
}

export default StartupForm
