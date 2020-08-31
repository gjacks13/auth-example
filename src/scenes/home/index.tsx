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
  const [token, setToken] = useState<any>(); // never set token in state
  const [scopes, setScopes] = useState<any>();
  const [user, setUser] = useState<any>();

  const toast = useToast();

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
        description: 'Failed to update vendor your mood.',
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
        setToken(token);

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
      <Heading as="h1" size="lg" margin="20px 0px 20px 20px">
        Select Your Mood
      </Heading>

      <SimpleGrid width="100%">
        <Skeleton isLoaded={!isLoading}>
          <Select
            placeholder="Select your new mood"
            onChange={element => {
              handleOnSubmit(parseInt(element.target.value));
            }}
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
          <Box>
            <Heading as="h1">
              {isAuthenticated
                ? 'This is your application on Auth'
                : 'This is your application not on Auth'}
            </Heading>
            <Heading as="h3">Current Scopes:</Heading>
            {scopes ? (
              scopes.map((scope: string, index: number) => (
                <Heading key={index} as="h4">
                  {scope}
                </Heading>
              ))
            ) : (
              <Heading as="h4">No Scopes Detected</Heading>
            )}
          </Box>
        </Skeleton>
      </SimpleGrid>
    </Box>
  );
};

export default Home;
