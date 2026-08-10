import { Button } from "@/components/ui/button"
import Link from "next/link"

const NotFound = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
        <h2>Ticket not found</h2>
        <p>The requested ticket could not be found.</p>
        <Link href="/tickets">
            <Button variant="destructive" className="mt-4">
                Go back to tickets
            </Button>
        </Link>
    </div>
  )
}

export default NotFound