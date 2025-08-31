import SmallTeam from "./small-team";

interface NoticeBoard {
  id: string;
  title: string;
  author: string;
  content: string;
  recipients: SmallTeam[];
  recipientsId: string[];
}
export default NoticeBoard;
