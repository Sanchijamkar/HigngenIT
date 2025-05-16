import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    address: '',
    qualification: '',
    course: '',
    trainingMode: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 4) {
      newErrors.name = 'Name must be at least 4 characters';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Valid 10-digit phone number required';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.qualification) newErrors.qualification = 'Qualification is required';
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.trainingMode) newErrors.trainingMode = 'Training mode is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id || e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setErrors({ server: data.message || 'Signup failed' });
        return;
      }

      navigate('/sign-in');
    } catch (err) {
      setLoading(false);
      setErrors({ server: 'Something went wrong' });
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
      <div className='bg-white p-10 rounded-lg shadow-lg w-full sm:w-96'>
        <h1 className='text-4xl text-center font-semibold text-gray-700 mb-8'>Create Your Account</h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Name, Email, Password */}
          <input id='name' placeholder='Full Name' onChange={handleChange} className='input' />
          {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}

          <input id='email' type='email' placeholder='Email' onChange={handleChange} className='input' />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}

          <input id='phone' placeholder='Phone Number' onChange={handleChange} className='input' />
          {errors.phone && <p className='text-red-500 text-sm'>{errors.phone}</p>}

          <select id='gender' onChange={handleChange} value={formData.gender} className='input'>
            <option value='' disabled>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && <p className='text-red-500 text-sm'>{errors.gender}</p>}

          <input id='address' placeholder='Address' onChange={handleChange} className='input' />
          {errors.address && <p className='text-red-500 text-sm'>{errors.address}</p>}

          <select id='qualification' onChange={handleChange} value={formData.qualification} className='input'>
            <option value='' disabled>Select Qualification</option>
            <option>B.Tech</option>
            <option>M.Tech</option>
            <option>MCA</option>
            <option>MBA</option>
            <option>Other</option>
          </select>
          {errors.qualification && <p className='text-red-500 text-sm'>{errors.qualification}</p>}

          <select id='course' onChange={handleChange} value={formData.course} className='input'>
            <option value='' disabled>Select Course</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Fullstack</option>
            <option>Java</option>
            <option>React</option>
          </select>
          {errors.course && <p className='text-red-500 text-sm'>{errors.course}</p>}

          {/* Training Mode Radio */}
          <div className='space-y-1'>
            <label className='block text-gray-700'>Training Mode:</label>
            <label><input type='radio' name='trainingMode' value='Online' onChange={handleChange} /> Online Training</label><br />
            <label><input type='radio' name='trainingMode' value='Classroom' onChange={handleChange} /> Classroom Training</label>
            {errors.trainingMode && <p className='text-red-500 text-sm'>{errors.trainingMode}</p>}
          </div>

          {/* Password */}
          <div className='relative'>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              onChange={handleChange}
              className='input'
            />
            <button type='button' className='absolute right-4 top-3 text-purple-500' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
          </div>

          <button type='submit' disabled={loading} className='btn'>
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <p className='text-center text-sm mt-4'>
          Already have an account?{' '}
          <Link to='/sign-in' className='text-purple-500 hover:underline'>Sign In</Link>
        </p>

        {errors.server && <p className='text-red-500 text-center mt-3'>{errors.server}</p>}
      </div>
    </div>
  );
}
