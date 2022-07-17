interface liHrefPros {
    href: string;
    text: string;
}

export function LiHref(props: liHrefPros) {
    return (
        <li>
            <a href={props.href} target="_">
                {props.text}
            </a>
        </li>
    );
}
