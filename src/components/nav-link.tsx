import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export const NavLink: React.FC<NavLinkProps> = (props) => {
  const { pathname } = useLocation()

  return (
    <Link
      data-active={pathname === props.to}
      className="flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground data-[active=true]:text-foreground"
      {...props}
    />
  )
}
