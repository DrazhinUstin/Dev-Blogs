'use client';

import { useFormState } from 'react-dom';
import { upsertProfile } from '@/app/lib/actions';
import FormSubmitBtn from '@/app/components/form-submit-btn';
import type { Profile } from '@prisma/client';

export default function UpsertProfileForm({ profile }: { profile: Profile | null }) {
  const [state, dispatch] = useFormState(upsertProfile, {});
  return (
    <form action={dispatch}>
      <div>
        <p>Gender:</p>
        <div>
          <label htmlFor='unknown'>Prefer not to say</label>
          <input
            type='radio'
            name='gender'
            id='unknown'
            value=''
            defaultChecked={!profile?.gender}
          />
        </div>
        <div>
          <label htmlFor='male'>Male</label>
          <input
            type='radio'
            name='gender'
            id='male'
            value='male'
            defaultChecked={profile?.gender === 'male'}
          />
        </div>
        <div>
          <label htmlFor='female'>Female</label>
          <input
            type='radio'
            name='gender'
            id='female'
            value='female'
            defaultChecked={profile?.gender === 'female'}
          />
        </div>
        {state.fieldErrors?.gender && <p>{state.fieldErrors.gender}</p>}
      </div>
      <div>
        <label htmlFor='websiteUrl'>Website url:</label>
        <input
          type='url'
          name='websiteUrl'
          id='websiteUrl'
          defaultValue={profile?.websiteUrl || undefined}
        />
        {state.fieldErrors?.websiteUrl && <p>{state.fieldErrors.websiteUrl}</p>}
      </div>
      <div>
        <label htmlFor='githubUrl'>Github url:</label>
        <input
          type='url'
          name='githubUrl'
          id='githubUrl'
          defaultValue={profile?.githubUrl || undefined}
        />
        {state.fieldErrors?.githubUrl && <p>{state.fieldErrors.githubUrl}</p>}
      </div>
      <div>
        <label htmlFor='linkedinUrl'>Linkedin url:</label>
        <input
          type='url'
          name='linkedinUrl'
          id='linkedinUrl'
          defaultValue={profile?.linkedinUrl || undefined}
        />
        {state.fieldErrors?.linkedinUrl && <p>{state.fieldErrors.linkedinUrl}</p>}
      </div>
      <div>
        <label htmlFor='bio'>Bio:</label>
        <textarea
          name='bio'
          id='bio'
          cols={30}
          rows={10}
          defaultValue={profile?.bio || undefined}
        ></textarea>
        {state.fieldErrors?.bio && <p>{state.fieldErrors.bio}</p>}
      </div>
      {state.errorMsg && <p>{state.errorMsg}</p>}
      <FormSubmitBtn>update</FormSubmitBtn>
    </form>
  );
}
