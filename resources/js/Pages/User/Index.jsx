import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({auth, users, queryParams = null, success}){
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if(value){
            queryParams[name] = value
        } else{
            delete queryParams[name]
        }
        router.get(route('user.index'), queryParams)
    }


    const onKeyPress = (name, e) => {
        if(e.key !== 'ENTER') return;

        searchFieldChanged(name, e.target.value);
    }
    

    const sortChanged = (name) =>{
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === 'asc'){
                queryParams.sort_direction = 'desc'
            }else{
                queryParams.sort_direction = 'asc'
            }
        }else{
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("user.index"), queryParams);
    }

    const deleteUser = (user) =>{

        if(!window.confirm('ARE YOU ABSOLUTELY SURE?')){
            return ;
        }
        router.delete(route('user.destroy', user.id));
    }
    return (

        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Users
                    </h2>
                    <Link href={route('user.create')} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                        ADD NEW
                    </Link>
                </div>
            }
        >
            <Head title='Users'/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (<div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                        {success}
                    </div>)}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* <prev>{JSON.stringify(users, undefined, 2)}</prev> */}
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="id" sortChanged={sortChanged}>
                                                ID
                                            </TableHeading>
                                            {/* <th className="px-3 py-2">Image</th> */}
                                            <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="name" sortChanged={sortChanged}>
                                                Name
                                            </TableHeading>
                                            <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="email" sortChanged={sortChanged}>
                                                Email
                                            </TableHeading>
                                            <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="created_at" sortChanged={sortChanged}>
                                                Create Date
                                            </TableHeading>
                                            {/* <TableHeading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="due_date" sortChanged={sortChanged}>
                                                Due Date
                                            </TableHeading> */}
                                            {/* <th className="px-3 py-2">Created By</th> */}
                                            <th className="px-3 py-2 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-2"></th>
                                            {/* <th className="px-3 py-2"></th> */}
                                            <th className="px-3 py-2">
                                                <TextInput className="w-full" defaultValue={queryParams.name} placeholder="USER NAME" onBlur={e => searchFieldChanged('name', e.target.value)} onKeyPress={e => onKeyPress('name', e)}/>
                                            </th>
                                            <th className="px-3 py-2">
                                            <TextInput className="w-full" defaultValue={queryParams.email} placeholder="USER EMAIL" onBlur={e => searchFieldChanged('email', e.target.value)} onKeyPress={e => onKeyPress('email', e)}/>
                                            </th>
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2"></th>
                                            {/* <th className="px-3 py-2"></th> */}
                                            {/* <th className="px-3 py-2"></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.data.map(user => (
                                            <tr  key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-3 py-2">
                                                    {user.id}
                                                </td>
                                                {/* <td className="px-3 py-2">
                                                    <img src={user.image_path} alt="" style={{width:60}}/>
                                                </td> */}
                                                <th className="px-3 py-2 text-gray-100 text-nowrap">
                                                    {/* <Link href={route('user.show', user.id)}>
                                                        {user.name}
                                                    </Link> */}
                                                    {user.name}
                                                </th>
                                                <td className="px-3 py-2">
                                                    {/* <span className={
                                                        "px-2 py-1 rounded text-white " +
                                                        USER_STATUS_CLASS_MAP[user.status]}>
                                                        {USER_STATUS_TEXT_MAP[user.status]}
                                                    </span> */}
                                                    {user.email}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {user.created_at}
                                                </td>
                                                {/* <td className="px-3 py-2 text-nowrap">
                                                    {user.due_date}
                                                </td> */}
                                                {/* <td className="px-3 py-2">
                                                    {user.createdBy.name}

                                                </td> */}
                                                <td className="px-3 py-2 text-nowrap">
                                                    <Link href={route('user.edit', user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                        EDIT
                                                    </Link>
                                                    <button onClick={(e) => deleteUser(user)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                                        DELETE
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={users.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}