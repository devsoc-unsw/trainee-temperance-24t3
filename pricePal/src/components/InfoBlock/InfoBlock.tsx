import React from "react";
import './InfoBlock.css';

interface InfoBlockProps {
    title: string;
    content: string;
    picture: string;
}

const InfoBlock = ({title, content, picture}: InfoBlockProps) => {

    return(
        <div className="info-block">
            <text className="title">{title}</text>
            <text className="content">{content}</text>
            {/* <text className="picture">{picture}</text> */}
            <img src={picture} className="picture"/>
        </div>
    )
};

export default InfoBlock;