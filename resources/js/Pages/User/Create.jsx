import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({auth}){
    const {data, setData, post, errors, reset} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('user.store'))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        CREATE A NEW USER
                    </h2>
                </div>
            }
        >
        <Head title='Tasks'/>
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    {/* <div className="p-6 text-gray-900 dark:text-gray-100"> */}
                        <form className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" onSubmit={onSubmit}>
                            
                            {/* <prev>{JSON.stringify(Tasks, undefined, 2)}</prev> */}
                            {/* <div>
                                <InputLabel htmlFor="user_image_path" value="User Image" />
                                <TextInput id="user_image_path" type="file" name="image" className="mt-1 block w-full" onChange={e => setData('image', e.target.files[0])} />
                                <InputError message={errors.image} className="mt-2" />
                            </div> */}
                            <div className="mt-4">
                                <InputLabel htmlFor="user_name" value="User Name" />
                                <TextInput id="user_name" name="name" type="text" value={data.name} isFocused={true} className="mt-1 block w-full" onChange={e => setData('name', e.target.value)} />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="user_email" value="User Email" />
                                <TextInput id="user_email" type="email" name="email" value={data.email} className="mt-1 block w-full" onChange={e => setData('email', e.target.value)} />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            
                            <div className="mt-4">
                                <InputLabel htmlFor="user_password" value="User Password" />
                                <TextInput id="user_password" type="password" name="password" value={data.password} className="mt-1 block w-full" onChange={e => setData('password', e.target.value)} />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="user_password_confirmation" value="User Password Confirmation" />
                                <TextInput id="user_password_confirmation" type="password" name="password_confirmation" value={data.password_confirmation} className="mt-1 block w-full" onChange={e => setData('password_confirmation', e.target.value)} />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <div className="mt-4 text-right">
                                <Link href={route('user.index')} className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
                                    CANCEL
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    SUBMIT
                                </button>
                            </div>
                        </form>
                    {/* </div> */}
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
    )
}