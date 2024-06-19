import NavLinks from '../components/nav-links';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <aside>
        <NavLinks
          links={[
            { id: 1, href: '/dashboard', label: 'overview' },
            { id: 2, href: '/dashboard/blogs', label: 'manage blogs' },
          ]}
        />
      </aside>
      <div>{children}</div>
    </div>
  );
}
