import { providers, signIn } from '@/auth';
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import FormSubmitBtn from '@/app/components/form-submit-btn';

const icons: { [key: string]: JSX.Element } = { github: <FaGithub />, google: <FaGoogle /> };

export default function Providers() {
  return (
    <div>
      {providers.map((provider, index) => {
        const { id, name } = typeof provider === 'function' ? provider() : provider;
        return (
          <form
            key={id}
            action={async () => {
              'use server';
              await signIn(id);
            }}
            className={index !== providers.length - 1 ? 'mb-2' : undefined}
          >
            <FormSubmitBtn className='btn-flex w-100'>
              {icons[id]}
              {name}
            </FormSubmitBtn>
          </form>
        );
      })}
    </div>
  );
}
