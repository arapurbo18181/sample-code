import {
  AiFillMail,
  AiFillSetting,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineLoading,
  AiOutlineMail,
  AiOutlineMinus,
  AiOutlinePhone,
  AiOutlinePlus,
  AiOutlineProfile,
} from "react-icons/ai";
import {
  BiBell,
  BiBriefcase,
  BiChevronLeft,
  BiChevronRight,
  BiSolidCalendarEvent,
  BiSolidEditLocation,
  BiSolidPhoneCall,
  BiSolidTrashAlt,
} from "react-icons/bi";
import {
  BsArrowRightCircle,
  BsBriefcase,
  BsCheckSquareFill,
  BsClipboard2Check,
  BsFillTrashFill,
  BsSearch,
  BsStar,
  BsStarFill,
  BsThreeDots,
} from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import {
  FiChevronDown,
  FiChevronUp,
  FiChevronsDown,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronsUp,
} from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { HiChatAlt2, HiLogout } from "react-icons/hi";
import { IoIosArrowBack, IoMdMore, IoMdPaper } from "react-icons/io";
import {
  IoCheckmarkDone,
  IoMailUnreadOutline,
  IoSearch,
} from "react-icons/io5";
import { LuLayoutDashboard, LuMessagesSquare } from "react-icons/lu";
import {
  MdLabelOutline,
  MdOutlineArchive,
  MdOutlineCastForEducation,
  MdOutlineMarkEmailRead,
} from "react-icons/md";
import { PiUsersThreeBold } from "react-icons/pi";
import { RiRefreshLine, RiReplyLine } from "react-icons/ri";
import { SiMicrosoftteams } from "react-icons/si";
import { TbAlphabetCyrillic, TbFileInvoice, TbNotes } from "react-icons/tb";

export type { IconType } from "react-icons";

export const IconsLibrary = {
  DoubleLeftIcon: FiChevronsLeft,
  DoubleRightIcon: FiChevronsRight,
  DoubleDown: FiChevronsDown,
  DoubleUp: FiChevronsUp,
  SingleRight: BiChevronRight,
  SingleLeft: BiChevronLeft,
  SingleDown: FiChevronDown,
  SingleUp: FiChevronUp,
  DashboardIcon: LuLayoutDashboard,
  EnquiryIcon: CiMail,
  UsersIcon: PiUsersThreeBold,
  TeamMembersIcon: SiMicrosoftteams,
  SettingsIcon: AiFillSetting,
  LogoutIcon: HiLogout,
  BellIcon: BiBell,
  CloseBtnIcon: GrClose,
  LoadingIcon: AiOutlineLoading,
  SearchBtnIcon: IoSearch,
  CheckIcon: BsCheckSquareFill,
  DoubleCheckIcon: IoCheckmarkDone,
  TrashIcon: BiSolidTrashAlt,
  RefreshIcon: RiRefreshLine,
  LabelIcon: MdLabelOutline,
  MoreIcon: IoMdMore,
  ArchiveIcon: MdOutlineArchive,
  ReadIcon: MdOutlineMarkEmailRead,
  UnreadIcon: IoMailUnreadOutline,
  StarIcon: BsStar,
  FilledStarIcon: BsStarFill,
  ReplyIcon: RiReplyLine,
  Message: LuMessagesSquare,
  Education: MdOutlineCastForEducation,
  Conversation: HiChatAlt2,
  ApplicantsIcon: MdOutlineCastForEducation,
  CasesIcon: BsBriefcase,
  TasksIcon: BsClipboard2Check,
  ContractsIcon: IoMdPaper,
  InvoicesIcon: TbFileInvoice,
  Option: BsThreeDots,
  Check: AiOutlineCheck,
  Close: AiOutlineClose,
  Minus: AiOutlineMinus,
  Prev: IoIosArrowBack,
  Plus: AiOutlinePlus,
  Filter: FaFilter,
  Search: BsSearch,
  Delete: BsFillTrashFill,
  Profile: AiOutlineProfile,
  Mail: AiOutlineMail,
  Phone: AiOutlinePhone,
  English: TbAlphabetCyrillic,
  Work: BiBriefcase,
  Notes: TbNotes,
  Location: BiSolidEditLocation,
  DOB: BiSolidCalendarEvent,
  CallSolid: BiSolidPhoneCall,
  MailSolid: AiFillMail,
  BackArrow: BsArrowRightCircle,
};
