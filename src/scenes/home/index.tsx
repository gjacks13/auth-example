import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import jwt from 'jsonwebtoken';
import { Box, Heading, SimpleGrid, Select, Skeleton, Divider, useToast } from '@chakra-ui/core';
import { Mood } from '../../types/Mood';
import { CallApi } from '../../util/requestWrapper';

const Home = () => {
  const [moods, setOptions] = useState<Mood[]>([]);
  const [currentMood, setMood] = useState<Mood>();
  const [scopes, setScopes] = useState<string[]>([]);
  const [user, setUser] = useState<any>();

  const toast = useToast();

  const hasWriteScope =
    scopes && scopes.length > 0 && scopes.includes('write:user:mood') ? true : false;

  const handleOnSubmit = async (moodUpdate: Mood) => {};

  useEffect(() => {
    (async () => {
      try {
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Box w="100%">
      <SimpleGrid width="50%" margin="auto">
        <Heading as="h1" size="lg" margin="20px 0px 20px 0">
          Select Your Mood
        </Heading>
        <Skeleton isLoaded={true}>
          <Select
            placeholder="Select your new mood"
            onChange={element => {
              const moodUpdate: Mood = {
                MoodID: parseInt(element.target.value),
                Name: element.target.options.item(element.target.options.selectedIndex)?.text || '',
              };
              handleOnSubmit(moodUpdate);
            }}
            isDisabled={!hasWriteScope}
          >
            {moods.map((moodObj: Mood) => (
              <option
                key={moodObj.MoodID}
                value={moodObj.MoodID}
                selected={moodObj.MoodID === currentMood?.MoodID}
              >
                {moodObj.Name}
              </option>
            ))}
          </Select>
          <Divider />
          <Box textAlign="center">
            <Heading as="h3" size="md">
              This is your application on Auth
            </Heading>
            <Divider />
            <Heading as="h4" size="sm">
              Current Scopes:
            </Heading>
            {scopes ? (
              scopes.map((scope: string, index: number) => (
                <Heading key={index} as="h5" size="xs">
                  {scope}
                </Heading>
              ))
            ) : (
              <Heading as="h5" size="xs">
                No Scopes Detected
              </Heading>
            )}
          </Box>
        </Skeleton>
      </SimpleGrid>
    </Box>
  );
};

export default Home;
