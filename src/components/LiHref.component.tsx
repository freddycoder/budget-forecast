interface LiHrefPros {
    href: string;
    text: string;
}

export function LiHref(props: Readonly<LiHrefPros>) {
    return (
        <li>
            <a href={props.href} target="_">
                {props.text}
            </a>
        </li>
    );
}
