import Spinner from "../_components/Spinner";

export default function loading() {
    return <div className="grid items-center justify-center">
        <Spinner />
        <p className="text-xl text-primary-50">Loading cabin's data</p>
    </div>
}