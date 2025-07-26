import { supabase } from './supabaseClient';

export const login = async (username: string, password: string) => {
  // Hardcoded allowed device ID
  const allowedDeviceId = '34444335-3534-3834-4D59-593835344435';

  // Get current device ID from localStorage
  const currentDeviceId = localStorage.getItem('device_id');

  // Check if the current device matches the allowed one
  if (currentDeviceId !== allowedDeviceId) {
    alert('You can only login from your original device ❌');
    return;
  }

  // Fetch user from Supabase
  const { data: user, error } = await supabase
    .from('login-page')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !user) {
    alert('User not found ❌');
    return;
  }

  if (user.password !== password) {
    alert('Wrong password ❌');
    return;
  }

  // First time login: bind the device if not set
  if (!user.device_id) {
    const { error: updateError } = await supabase
      .from('login-page')
      .update({ device_id: allowedDeviceId })
      .eq('username', username);

    if (updateError) {
      alert('Error binding device ❌');
      return;
    }
  }

  alert('Login successful 🎉');
};
