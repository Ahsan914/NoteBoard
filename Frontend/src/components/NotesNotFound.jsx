
import {NotebookIcon} from "lucide-react";
import {Link} from "react-router";

export default function NotesNotFound(){

	return(
		<div className="flex flex-col justify-center items-center text-center py-16 space-y-6 mx-auto max-w-md">
			<div className="bg-primary/10 p-8 rounded-full">
				<NotebookIcon className="size-10 text-primary"/>
			</div>
			<h3 className="text-2xl font-bold">No Notes yet</h3>
			<p className="text-base-content/70">Ready to organize your thoughts? Create ypur first note to get started on your journey</p>
			<Link to={"/create"} className="btn btn-primary">Create Your First Note</Link>
		</div>
	)
}