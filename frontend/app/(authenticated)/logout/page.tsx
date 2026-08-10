import { logout } from '@/features/auth/api/logout'
import { redirect } from 'next/navigation';

const page = () => {
  logout();
  redirect('/login');
}

export default page
