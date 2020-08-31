import React from 'react';
import { Box, Skeleton } from '@chakra-ui/core';
import styles from './Placeholder.module.css';

// TODO: Add Margin, lines (count), more loaderTypes (header, image)
// TODO: Improve string typing
interface IProps {
  loader: 'single' | 'paragraph' | 'lines';
  margin?: string;
  padding?: string;
  className?: string;
  lineWidth?: '10' | '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90' | '100' | undefined;
  lineHeight?: string;
  lineMargin?: string;
}

const getWidth = (width: string) => {
  interface IWidthMap {
    [key: string]: string;
  }

  const widthMap: IWidthMap = {
    '10': 'ten',
    '20': 'twenty',
    '30': 'thirty',
    '40': 'forty',
    '50': 'fifty',
    '60': 'sixty',
    '70': 'seventy',
    '80': 'eighty',
    '90': 'ninety',
    '100': 'hundred',
  };

  return styles[widthMap[width]];
};

const Placeholder = (props: IProps) => {
  let lineWidth = props.lineWidth ? props.lineWidth : '100';
  let margin = props.margin ? props.margin : '10px 10px 10px 10px';
  let padding = props.padding ? props.padding : '10px 10px 10px 10px';

  switch (props.loader) {
    case 'single':
      return (
        <Box margin={margin} padding={padding}>
          <Skeleton
            className={getWidth(lineWidth)}
            height={props.lineHeight}
            my={props.lineMargin}
          />
        </Box>
      );
    case 'paragraph':
      return (
        <Box margin={margin} padding={padding}>
          <Skeleton className={getWidth('100')} height={props.lineHeight} my={props.lineMargin} />
          <Skeleton className={getWidth('50')} height={props.lineHeight} my={props.lineMargin} />
          <Skeleton className={getWidth('80')} height={props.lineHeight} my={props.lineMargin} />
          <Skeleton className={getWidth('60')} height={props.lineHeight} my={props.lineMargin} />
          <Skeleton className={getWidth('30')} height={props.lineHeight} my={props.lineMargin} />
          <Skeleton className={getWidth('100')} height={props.lineHeight} my={props.lineMargin} />
          <Skeleton className={getWidth('50')} height={props.lineHeight} my={props.lineMargin} />
          <Skeleton className={getWidth('80')} height={props.lineHeight} my={props.lineMargin} />
        </Box>
      );
    case 'lines':
      return (
        <Box margin={margin} padding={padding}>
          <Skeleton className={getWidth('100')} height={props.lineHeight} my={props.lineMargin} />
          <Skeleton className={getWidth('50')} height={props.lineHeight} my={props.lineMargin} />
          <Skeleton className={getWidth('80')} height={props.lineHeight} my={props.lineMargin} />
          <Skeleton className={getWidth('60')} height={props.lineHeight} my={props.lineMargin} />
          <Skeleton className={getWidth('30')} height={props.lineHeight} my={props.lineMargin} />
        </Box>
      );
    default:
      return <Box></Box>;
  }
};

Placeholder.defaultProps = {
  lineHeight: '1em',
  lineMargin: '10px',
};

export default Placeholder;
