import React from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/core';

const UnprotectedScene = () => {
  return (
    <Box w="100%">
      <SimpleGrid width="100%">
        <Heading as="h1" textAlign="center">
          We don't need Auth to get to this page
        </Heading>
      </SimpleGrid>
    </Box>
  );
};

export default UnprotectedScene;
