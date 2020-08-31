import React from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/core';

const UnprotectedScene = () => {
  return (
    <Box w="100%">
      <Heading as="h1" size="lg" margin="20px 0px 20px 20px">
        Select Your Mood
      </Heading>

      <SimpleGrid width="100%">
        <Heading as="h1">We don't want Auth to get to this page</Heading>
      </SimpleGrid>
    </Box>
  );
};

export default UnprotectedScene;
