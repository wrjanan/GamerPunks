import { Card } from 'antd';
import "../../css/TeamCard.css"
const { Meta } = Card;

type TeamCardProps = {
    src: string,
    alt?: string,
    title: string,
    description?: string,
}

const TeamCard: React.FC<TeamCardProps> = ({
    children,
    src,
    alt,
    title,
    description,
}): React.ReactElement => {
    return (<Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={alt} src={src} />}
    >
        <Meta title={title} description={description} />
    </Card>);
}

export default TeamCard