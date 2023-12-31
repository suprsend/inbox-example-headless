import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { ReactComponent as AvatarIcon } from "../assets/Avatar.svg";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  relativeTime: {
    past: "%ss",
    s: "1m",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mo",
    MM: "%dmo",
    y: "1y",
    yy: "%dy",
  },
});

export default function Notification({ notificationData, markClicked }) {
  const { message, seen_on: seenOn, created_on: createdOn } = notificationData;

  const actionOne = message?.actions?.[0];
  const actionTwo = message?.actions?.[1];
  const hasButtons = actionOne || actionTwo;

  const handleActionClick = (url) => {
    if (!notificationData.interacted_on) {
      markClicked(notificationData.n_id);
      if (url) {
        setTimeout(() => {
          window.open(url, "_self");
        }, 1000);
      }
    } else {
      if (url) {
        window.open(url, "_self");
      }
    }
  };

  return (
    <Container
      read={!!seenOn}
      onClick={(e) => {
        e.stopPropagation();
        handleActionClick(notificationData.url);
      }}
    >
      <NotificationView>
        <LeftView>
          <AvatarView
            onClick={(e) => {
              e.stopPropagation();
              handleActionClick(message?.avatar?.action_url);
            }}
          >
            {message?.avatar?.avatar_url ? (
              <AvatarImage src={message.avatar.avatar_url} alt="avatar" />
            ) : (
              <AvatarIcon />
            )}
          </AvatarView>

          <div>
            <HeaderText>{message.header}</HeaderText>
            <BodyText>{message?.text}</BodyText>
          </div>
        </LeftView>
        <RightView>
          <CreatedText>{dayjs(createdOn).fromNow(true)}</CreatedText>
          {!seenOn && (
            <div>
              <UnseenDot />
            </div>
          )}
        </RightView>
      </NotificationView>
      {message?.subtext?.text && (
        <SubTextView
          link={message?.subtext?.action_url}
          onClick={(e) => {
            e.stopPropagation();
            handleActionClick(message?.subtext?.action_url);
          }}
        >
          <SubText>{message.subtext.text}</SubText>
        </SubTextView>
      )}
      {hasButtons && (
        <ButtonContainer>
          {actionOne && (
            <ButtonView
              key={actionOne.id}
              onClick={(e) => {
                e.stopPropagation();
                handleActionClick(actionOne.url);
              }}
            >
              <ButtonText>{actionOne.name}</ButtonText>
            </ButtonView>
          )}
          {actionTwo && (
            <ButtonOutlineView
              key={actionTwo.id}
              onClick={(e) => {
                e.stopPropagation();
                handleActionClick(actionTwo.url);
              }}
            >
              <ButtonOutlineText>{actionTwo.name}</ButtonOutlineText>
            </ButtonOutlineView>
          )}
        </ButtonContainer>
      )}
    </Container>
  );
}

const CText = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  line-height: 20px;
  color: #1c1c1c;
  margin: 0px;
`;

const Container = styled.div`
  padding: 12px 14px;
  cursor: pointer;
  background-color: ${(props) => {
    return props.read ? "#FFF" : "#F4F9FF";
  }};
  border-bottom: 0.5px solid #dbdada;
  &:hover {
    background-color: ${(props) => (props.read ? "#F6F6F6" : "#DFECFF")};
  }
`;

const SubText = styled(CText)`
  font-size: 11px;
  margin-left: ${(props) => (props.hideAvatar ? "0px" : "42px")};
  color: #707070;
`;

const SubTextView = styled.div`
  text-decoration: none;
  overflow-wrap: anywhere;
  &:hover {
    text-decoration: ${(props) => (props.link ? "underline" : "none")};
    text-decoration-color: #707070;
  }
`;

const NotificationView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const HeaderText = styled(CText)`
  margin: 10px 0px;
  overflow-wrap: anywhere;
  line-height: 16px;
  font-weight: 700;
`;

const BodyText = styled.div`
  font-size: 13px;
  line-height: 18px;
  margin: 10px 0px 5px 0px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: #1c1c1c;
`;

const UnseenDot = styled.div`
  background-color: #066af3;
  border-radius: 50%;
  width: 7px;
  height: 7px;
  margin-top: 10px;
`;

const CreatedText = styled(CText)`
  font-size: 12px;
  color: #707070;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 5px;
  margin-left: 40px;
  margin-top: 10px;
  overflow-wrap: anywhere;
`;

const ButtonView = styled.div`
  max-width: 50%;
  background: #066af3;
  border-radius: 5px;
  text-decoration: none;
  padding: 4px 16px;
`;

const ButtonText = styled(CText)`
  color: #fff;
  text-align: center;
  word-break: break-all;
  font-weight: 600;
  font-size: 13px;
`;

const ButtonOutlineView = styled(ButtonView)`
  background: #fff;
  border-color: #dbdada;
  border-style: solid;
  border-width: 0.5px;
`;

const ButtonOutlineText = styled(ButtonText)`
  color: #434343;
`;

const LeftView = styled.div`
  display: flex;
  overflow-wrap: anywhere;
`;

const AvatarView = styled.div`
  margin-top: 10px;
  margin-right: 10px;
`;

const RightView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
`;

const AvatarImage = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 100px;
`;
