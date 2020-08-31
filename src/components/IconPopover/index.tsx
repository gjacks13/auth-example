import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
} from '@chakra-ui/core';

type IProps = {
  header?: string;
  bodyTxt?: string;
  icon?: string;
  ariaLabel?: string;
  className?: string;
};

const IconPopover = (props: IProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          className={props.className}
          variant="outline"
          variantColor="teal"
          aria-label={`${props.ariaLabel}`}
          icon="info"
          size="xs"
        />
      </PopoverTrigger>
      <PopoverContent zIndex={4}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{props.header}</PopoverHeader>
        <PopoverBody>{props.bodyTxt}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default IconPopover;
