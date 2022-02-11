import React from "react";
import { DualRing } from "react-spinners-css";
import styled from "styled-components";
import { AppContainer } from "./AppContainer";
import {searchParsed} from "./searchParsed";

type ScoreSaberPlayerBasic = {
  playerInfo: {
    playerId: string;
    playerName: string;
    avatar: string; // "/api/static/avatars/76561198035381239.jpg"
    rank: number;
    countryRank: number;
    pp: number;
    country: string; // uppercase 2 letters
    role: string; // empty for no role
    badges: unknown[]; // have to check cerrets profile later
    history: string; // example:	"1171,1173,1172,1171,1173,1179,1182,1183,1186,1184,1179,1182,1185,1186,1186,1186,1184,1188,1190,1193,1194,1200,1203,1202,1202,1204,1203,1205,1206,1211,1216,1216,1219,1222,1227,1232,1233,1233,1236,1240,1241,1242,1244,1243,1244,1252,1257,1259,1260"
    permissions: number; // boolstring?
    inactive: number; // bool?
    banned: number; // bool?
  };
};

const scoreSaberApiProfileBasicUrl = (scoreSaberId: string) =>
  `https://new.scoresaber.com/api/player/${scoreSaberId}/basic`;
const scoreSaberApiProfileImgUrl = (avatarUrl: string) =>
  `https://new.scoresaber.com${avatarUrl}`;

const createUseScoreSaberData = (scoreSaberId: string) => {
  const endpointUrl = scoreSaberApiProfileBasicUrl(scoreSaberId);

  const useScoreSaberData = () => {
    const [data, setData] = React.useState<null | ScoreSaberPlayerBasic>(null);
    const [isFetching, setIsFetching] = React.useState(false);
    const refetch = React.useCallback(() => {
      setIsFetching(true);
      return fetch(endpointUrl)
        .then((res) => res.json() as Promise<ScoreSaberPlayerBasic>)
        .then(setData)
        .then(() => setIsFetching(false));
    }, [setData, setIsFetching]);
    return [data, isFetching, refetch] as const;
  };

  return useScoreSaberData;
};

const useScoreSaberData = createUseScoreSaberData(searchParsed.playerId);

function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const ChildContainer = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const GenericText = styled.div`
  padding: 2px 5px;
`;

const ProfileWrapper = styled(ChildContainer)``;
const PlayerName = styled(GenericText)``;
const PlayerPp = styled(GenericText)``;

const RankWrapper = styled(ChildContainer)``;
const GlobalRank = styled(GenericText)``;
const CountryRank = styled(GenericText)``;

const intervalSpan = 1000 * 300;
const App = () => {
  const [dataBeforeFetch, setDataBeforeFetch] =
    React.useState<null | ScoreSaberPlayerBasic>(null);
  const [data, isFetching, refetch] = useScoreSaberData();

  React.useEffect(() => {
    refetch(); // initial fetch

    setInterval(() => {
      refetch();
    }, intervalSpan);
  }, [ refetch ]);

  React.useEffect(() => {
    if (isFetching) {
      setDataBeforeFetch(data);
    }
  }, [isFetching, data, setDataBeforeFetch]);

  const _data = data || dataBeforeFetch;
  const avatarUrl = _data ? scoreSaberApiProfileImgUrl(_data.playerInfo.avatar) : undefined;

  if (isFetching) {
    return (
      <AppContainer avatarUrl={avatarUrl} maxWidth="64">
        <DualRing color="black" size={64} />
      </AppContainer>
    );
  }
  if (data === null) {
    return (
      <AppContainer avatarUrl={avatarUrl} maxWidth="64">
        <DualRing color="red" size={64} />
      </AppContainer>
    );
  }

  const { playerInfo } = data;
  const { rank, countryRank, country, playerName, pp } = playerInfo;
  const globeEmoji = "🌐";
  const flagEmoji = getFlagEmoji(country);

  return (
    <AppContainer avatarUrl={avatarUrl}>
      <>
      <ProfileWrapper>
        <PlayerName>{playerName}</PlayerName>
        <PlayerPp>{pp}pp</PlayerPp>
      </ProfileWrapper>
      <RankWrapper>
        <CountryRank>
          {flagEmoji}&nbsp;{countryRank}
        </CountryRank>
        <GlobalRank>
          {rank}&nbsp;{globeEmoji}
        </GlobalRank>
      </RankWrapper>
      </>
    </AppContainer>
  );
};

export default App;
