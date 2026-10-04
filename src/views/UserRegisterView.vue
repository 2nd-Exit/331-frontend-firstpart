<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'

const authStore = useAuthStore()
const messageStore = useMessageStore()
const router = useRouter()

const validationSchema = yup.object({
  username: yup.string().required('The username is required'),
  firstname: yup.string().required('The first name is required'),
  lastname: yup.string().required('The last name is required'),
  email: yup.string().required('The email is required').email('Input must be an email.'),
  password: yup
    .string()
    .required('The password is required')
    .min(6, 'The password must be at least 6 characters.'),
  confirmPassword: yup
    .string()
    .required('Please confirm the password')
    .oneOf([yup.ref('password')], 'The passwords do not match'),
})

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
})
const { value: username } = useField<string>('username')
const { value: firstname } = useField<string>('firstname')
const { value: lastname } = useField<string>('lastname')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')

const onSubmit = handleSubmit((values) => {
  authStore
    .register({
      username: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
    })
    .then(() => {
      messageStore.updateMessage('Register success, please login')
      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
      router.push({ name: 'login-view' })
    })
    .catch(() => {
      messageStore.updateMessage('could not register (the username may already exist)')
      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
    })
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="@/assets/logo.svg" alt="CAMT" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" novalidate @submit="onSubmit">
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <InputText id="username" type="text" v-model="username" placeholder="Username" :error="errors['username']" />
        </div>
        <div>
          <label for="firstname" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
          <InputText id="firstname" type="text" v-model="firstname" placeholder="First name" :error="errors['firstname']" />
        </div>
        <div>
          <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
          <InputText id="lastname" type="text" v-model="lastname" placeholder="Last name" :error="errors['lastname']" />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <InputText id="email" type="email" v-model="email" placeholder="Email address" :error="errors['email']" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <InputText id="password" type="password" v-model="password" placeholder="Password" :error="errors['password']" />
        </div>
        <div>
          <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900">Confirm password</label>
          <InputText id="confirmPassword" type="password" v-model="confirmPassword" placeholder="Confirm password" :error="errors['confirmPassword']" />
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
          >
            Sign up
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500">
        Already a member?
        <RouterLink :to="{ name: 'login-view' }" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign in here
        </RouterLink>
      </p>
    </div>
  </div>
</template>