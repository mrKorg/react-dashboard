import React, { memo } from "react";
import PropTypes from "prop-types";
import { Title, Text, Paragraph, Link } from './style';
import { Button, Card, Icon } from 'antd';

const MODES = { TITLE_ONLY: 'TITLE_ONLY', IN_TABLE: 'IN_TABLE', CARD: 'CARD', ROW: 'ROW' };

const ArticlePreview = ({ data, mode = MODES.TITLE_ONLY }) => {
  const { source, author, title, description, url, urlToImage, publishedAt, content } = data;

  const renderTitle = () => (
    <Title level={2}>
      {title}
    </Title>
  );

  const renderAuthor = () => author && (
    <Paragraph>
      <Text>
        Author:&#160;
      </Text>
      <Text strong>
        {author?.name && author.name}
        {author?.title && author.title}
        {typeof author === "string" && author}
      </Text>
    </Paragraph>
  );

  const renderSource = () => (source?.name || url) && (
    <Paragraph>
      <Text>
        Source:&#160;
      </Text>
      {source.name && url && (
        <Link href={url} target="_blank">
          <Text strong>
            {source.name}
          </Text>
        </Link>
      )}
      {source.name && !url && (
        <Text strong>
          {source.name}
        </Text>
      )}
      {!source.name && url && (
        <Link href={url} target="_blank" style={{ padding: 0 }}>
          <Icon type="link" />
        </Link>
      )}
    </Paragraph>
  );

  const renderDescription = () => description && (
    <Paragraph>
      {description}
    </Paragraph>
  );

  const renderView = () => {
    switch (mode) {
      case MODES.TITLE_ONLY:
        return renderTitle();
      case MODES.IN_TABLE:
        return (
          <div style={{ display: 'inline-block' }}>
            {renderTitle()}
            {renderAuthor()}
            {renderSource()}
          </div>
        );
      default:
        return null;
    }
  };

  return renderView();
};

ArticlePreview.propTypes = {
  mode: PropTypes.oneOf(Object.keys(MODES).map(k => MODES[k])),
  data: PropTypes.shape({
    source: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    }),
    author: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    url: PropTypes.string,
    urlToImage: PropTypes.string,
    publishedAt: PropTypes.string,
    content: PropTypes.string
  })
};

export default memo(ArticlePreview);
