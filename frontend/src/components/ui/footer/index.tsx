export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-yellow-200 py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </footer>
    )
}