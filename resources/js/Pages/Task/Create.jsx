import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({auth, projects, users}){
    const {data, setData, post, errors, reset} = useForm({
        image: '',
        name: '',
        status: '',
        description: '',
        due_date: '',
        
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('task.store'))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        CREATE A NEW TASK
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
                             <div>
                                <InputLabel htmlFor="task_project_id" value="Project" />
                                <SelectInput id="task_project_id" name="project_id" className="mt-1 block w-full" onChange={e => setData('project_id', e.target.value)}>
                                    <option value="">SELECT PROJECT</option>
                                    {projects.data.map((project) => (
                                        <option value={project.id} key={project.id}>{project.name}</option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.assigned_user_id} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="task_image_path" value="Task Image" />
                                <TextInput id="task_image_path" type="file" name="image" className="mt-1 block w-full" onChange={e => setData('image', e.target.files[0])} />
                                <InputError message={errors.image} className="mt-2" />
                            </div>

                            
                            <div className="mt-4">
                                <InputLabel htmlFor="task_name" value="Task Name" />
                                <TextInput id="task_name" name="name" value={data.name} className="mt-1 block w-full" onChange={e => setData('name', e.target.value)} />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                                                        
                            <div className="mt-4">
                                <InputLabel htmlFor="task_description" value="Task Description" />
                                <TextAreaInput id="task_description" name="description" value={data.description} className="mt-1 block w-full" onChange={e => setData('description', e.target.value)} />
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                                                        
                            <div className="mt-4">
                                <InputLabel htmlFor="task_due_date" value="Task DeadLine" />
                                <TextInput id="task_due_date" type="date" name="due_date" value={data.due_date} className="mt-1 block w-full" onChange={e => setData('due_date', e.target.value)} />
                                <InputError message={errors.due_date} className="mt-2" />
                            </div>
                                                        
                            <div className="mt-4">
                                <InputLabel htmlFor="task_status" value="Task Status" />
                                <SelectInput id="task_status" name="status" className="mt-1 block w-full" onChange={e => setData('status', e.target.value)}>
                                    <option value="">SELECT STATUS</option>
                                    <option value="pending">PENDING</option>
                                    <option value="in_progress">IN PROGRESS</option>
                                    <option value="completed">COMPLETED</option>
                                </SelectInput>
                                <InputError message={errors.task_status} className="mt-2" />
                            </div>
                                                        
                            <div className="mt-4">
                                <InputLabel htmlFor="task_priority" value="Task Priority" />
                                <SelectInput id="task_priority" name="priority" className="mt-1 block w-full" onChange={e => setData('priority', e.target.value)}>
                                    <option value="">SELECT PRIORITY</option>
                                    <option value="low">LOW</option>
                                    <option value="medium">MEDIUM</option>
                                    <option value="high">HIGH</option>
                                </SelectInput>
                                <InputError message={errors.priority} className="mt-2" />
                            </div>
                                                        
                            <div className="mt-4">
                                <InputLabel htmlFor="task_assigned_user" value="Assigned User" />
                                <SelectInput id="task_assigned_user" name="assigned_user_id" className="mt-1 block w-full" onChange={e => setData('assigned_user_id', e.target.value)}>
                                    <option value="">SELECT USER</option>
                                    
                                    {users.data.map((user) => (
                                        <option value={user.id} key={user.id}>{user.name}</option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.assigned_user_id} className="mt-2" />
                            </div>

                            <div className="mt-4 text-right">
                                <Link href={route('task.index')} className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
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