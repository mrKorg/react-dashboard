import React, { memo } from "react";
import PropTypes from "prop-types";
import { Card, Icon, Empty } from "antd";
import { Link, GridContainer } from "components/StyledComponents";
import TableTimestamp from "components/TableTimestamp";
import { ARTICLE_MODES } from "helpers/constants";
import { Title, Text, Paragraph } from "./style";

const ArticlePreview = ({ data, mode = ARTICLE_MODES.TITLE_ONLY }) => {
  const {
    source,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt
  } = data;

  const renderTitle = () => <Title level={2}>{title}</Title>;

  const renderDate = () =>
    publishedAt && (
      <Paragraph>
        <TableTimestamp timestamp={publishedAt} />
      </Paragraph>
    );

  const renderAuthor = () =>
    author && (
      <Paragraph>
        <Text>Author:&#160;</Text>
        <Text strong>
          {author?.name && author.name}
          {author?.title && author.title}
          {typeof author === "string" ? (
            author.indexOf("http") === 0 ? (
              <Link href={author} target="_blank">
                Source
              </Link>
            ) : (
              author
            )
          ) : null}
        </Text>
      </Paragraph>
    );

  const renderSource = () =>
    (source?.name || url) && (
      <Paragraph>
        <Text>Source:&#160;</Text>
        {source.name && url && (
          <Link href={url} target="_blank">
            <Text strong>{source.name}</Text>
          </Link>
        )}
        {source.name && !url && <Text strong>{source.name}</Text>}
        {!source.name && url && (
          <Link href={url} target="_blank" style={{ padding: 0 }}>
            <Icon type="link" />
          </Link>
        )}
      </Paragraph>
    );

  const renderDescription = () =>
    description && <Paragraph>{description}</Paragraph>;

  const renderView = () => {
    switch (mode) {
      case ARTICLE_MODES.TITLE_ONLY:
        return renderTitle();
      case ARTICLE_MODES.IN_TABLE:
        return (
          <div style={{ display: "inline-block" }}>
            {renderTitle()}
            {renderAuthor()}
            {renderSource()}
          </div>
        );
      case ARTICLE_MODES.CARD:
        return (
          <Card
            style={{ height: "100%" }}
            cover={
              urlToImage ? (
                <img alt="" src={urlToImage} />
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )
            }
          >
            {renderDate()}
            {renderTitle()}
            {renderAuthor()}
            {renderSource()}
            {!urlToImage && renderDescription()}
          </Card>
        );
      case ARTICLE_MODES.ROW:
        return (
          <Card>
            <GridContainer gap="24px" columns="minmax(30px, 150px) auto">
              <div>
                {urlToImage ? (
                  <img alt="" src={urlToImage} />
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </div>
              <div>
                {renderDate()}
                {renderTitle()}
                {renderAuthor()}
                {renderSource()}
                {renderDescription()}
              </div>
            </GridContainer>
          </Card>
        );
      default:
        return null;
    }
  };

  return renderView();
};

ArticlePreview.propTypes = {
  mode: PropTypes.oneOf(Object.keys(ARTICLE_MODES).map(k => ARTICLE_MODES[k])),
  data: PropTypes.shape({
    source: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    }),
    author: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    url: PropTypes.string,
    urlToImage: PropTypes.string,
    publishedAt: PropTypes.string,
    content: PropTypes.string
  })
};

export default memo(ArticlePreview);
