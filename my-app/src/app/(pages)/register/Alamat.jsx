import Dropdown from "@/_components/Dropdown/dropdown";

export default function Alamat({ data, action }) {
    const actionOnchange = (newValue) => {
        action({
            ...data,
            kelurahan_id: newValue,
        });
    };
    return (
        <div className="px-5 py-10 font-Subtitle">
            <div className=" font-Subtitle text-[20px] ">
                <Dropdown category="provinsi" />
                <Dropdown category="kabupaten" />
                <div className="grid grid-cols-2 gap-2">
                    <Dropdown category="kecamatan" />
                    <Dropdown
                        category="kelurahan"
                        sendToParent={actionOnchange}
                    />
                </div>
            </div>
        </div>
    );
}
