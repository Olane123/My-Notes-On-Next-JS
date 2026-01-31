import Image from 'next/image'
import Link from "next/link";

const githubLink: string = "https://github.com/Olane123/My-Notes-On-Next-JS";
const githubImage: string = "/githubicon.png";

export default function Home() {
    return (
        <>
            <div className="about">
                <h1>Блокнот для записей — удобное место для хранения мыслей, планов и заметок.</h1>
                <h1>Добавляйте, редактируйте или удаляйте записи по мере необходимости.</h1>

                <div className="repository">
                    <Link href={githubLink}><Image width={100} height={100} src={githubImage} alt="github" /></Link>
                </div>
            </div>
        </>
    );
}
