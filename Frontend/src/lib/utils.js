
export function formatDate(date){
	return date.toLocaleDateString("en-US", {
		month: "short",
		date: "numeric",
		year: "numeric",
	})
}