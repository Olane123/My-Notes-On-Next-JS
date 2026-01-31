import Image from 'next/image'
import Link from "next/link";
import githubIcon from "./githubicon.png"

const githubLink: string = "https://github.com/Olane123/My-Notes-On-Next-JS";

export default function Home() {
    return (
        <>
            <div className="about">
                <h1>Блокнот для записей — удобное место для хранения мыслей, планов и заметок.</h1>
                <h1>Добавляйте, редактируйте или удаляйте записи по мере необходимости.</h1>

                <div className="repository">
                    <Link href={githubLink}><Image width={100} height={100} src={githubIcon} alt="github" /></Link>
                </div>
            </div>
        </>
    );
}
