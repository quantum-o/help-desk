import { logout } from '@/features/authentication/api/logout'
import { redirect } from 'next/navigation';

const page = () => {
  logout();
  redirect('/login');
}

export default page
