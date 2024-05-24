import { providers, signIn } from '@/auth';
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import FormSubmitBtn from '@/app/components/form-submit-btn';

const icons: { [key: string]: JSX.Element } = { github: <FaGithub />, google: <FaGoogle /> };

export default function Providers() {
  return (
    <div>
      {providers.map((provider) => {
        const { id, name } = typeof provider === 'function' ? provider() : provider;
        return (
          <form
            key={id}
            action={async () => {
              'use server';
              await signIn(id);
            }}
          >
            <FormSubmitBtn>
              {icons[id]}
              {name}
            </FormSubmitBtn>
          </form>
        );
      })}
    </div>
  );
}
