import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import jwt from 'jsonwebtoken';
import { Box, Heading, SimpleGrid, Select, Skeleton, Divider, useToast } from '@chakra-ui/core';
import { Mood } from '../../types/Mood';
import { CallApi } from '../../util/requestWrapper';

const Home = () => {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
  const [moods, setOptions] = useState<Mood[]>([
    { MoodID: 1, Name: '1' },
    { MoodID: 2, Name: '2' },
  ]);
  const [currentMood, setMood] = useState<Mood>();
  const [scopes, setScopes] = useState<string[]>([]);
  const [user, setUser] = useState<any>();

  const toast = useToast();

  const hasWriteScope = scopes && scopes.length > 0 && scopes.includes('write:all') ? true : false;

  const handleOnSubmit = async (moodId: number) => {
    const token = await getAccessTokenSilently();

    try {
      // update mood
      await CallApi('PUT', `/user/${user}/mood}`, token, { MoodID: moodId });
      toast({
        title: 'Mood Update',
        description: 'Successfully updated your Mood!',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'bottom-right',
      });
    } catch (e) {
      toast({
        title: 'Mood Update',
        description: 'Failed to update your mood.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();

        let moods = await CallApi('GET', '/moods', token);
        setOptions(moods);

        let currentMood = await CallApi('GET', `/user/${'userId'}/mood`, token);
        setMood(currentMood);

        const decodedToken: any = jwt.decode(token);
        const scopeStr: string = decodedToken.scopes;
        const scopes = scopeStr ? scopeStr.split(' ') : [];
        setScopes(scopes);

        setUser(decodedToken['https://meta/email']);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [getAccessTokenSilently]);

  return (
    <Box w="100%">
      <SimpleGrid width="50%" margin="auto">
        <Heading as="h1" size="lg" margin="20px 0px 20px 0">
          Select Your Mood
        </Heading>
        <Skeleton isLoaded={!isLoading}>
          <Select
            placeholder="Select your new mood"
            onChange={element => {
              handleOnSubmit(parseInt(element.target.value));
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
              {isAuthenticated
                ? 'This is your application on Auth'
                : 'This is your application not on Auth'}
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
