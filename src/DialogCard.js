import React from 'react';
import {Card} from "react-bootstrap";

/**
 *
 * @param {string} header
 * @param {string} title
 * @param {JSX.Element[]} content
 * @param {JSX.Element[]} footer
 * @returns {JSX.Element}
 * @constructor
 */
const DialogCard = ({
    header = "",
    title = "",
    content = [<></>],
    footer = <></>,
                }) => {
    return (
        <Card className="bg-opacity-100">
            {header && header.length > 0 && (
                <Card.Header className="text-bg-primary">{header}</Card.Header>
            )}
            <Card.Body>
                {title && title.length > 0 && (
                    <Card.Title>{title}</Card.Title>
                )}

                <div className="mb-3">
                    {content}
                </div>

                {footer}
            </Card.Body>
        </Card>
    );
};

export default DialogCard;
