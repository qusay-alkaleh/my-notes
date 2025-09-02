import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiHash,
  FiCalendar,
  FiFileText,
  FiEdit,
} from "react-icons/fi";
import { Textarea } from "../ui/textarea";
import { formatArabicDate } from "@/lib/date-time";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props extends NoteDomain {
  className?: string;
}

const UserSummary: React.FC<Props> = ({
  content,
  created_at,
  updated_at,
  email,
  full_name,
  phone,
  public_id,
  title,
  className = "w-full md:w-1/2",
}) => {
  const SUMMARY_FIELDS = [
    { label: "اسم الشخص الكامل", value: full_name, icon: FiUser },
    { label: "رقم الهاتف", value: phone, icon: FiPhone },
    { label: "البريد الإلكتروني", value: email, icon: FiMail },
    { label: "عنوان الملاحظة", value: title, icon: FiFileText },
    { label: "كود التتبع", value: public_id, icon: FiHash },
    {
      label: "تاريخ الإنشاء",
      value: formatArabicDate(created_at),
      icon: FiCalendar,
    },
  ];

  return (
    <Card className={cn("shadow-md border border-gray-200", className)}>
      <CardHeader>
        <CardTitle className="text-lg flex justify-between items-center gap-2">
          <div className="flex items-center gap-1">
            <FiEdit className="text-blue-600" />
            ملخص الملاحظة
          </div>
          <span
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "text-xs bg-gradient-to-r from-blue-500 to-green-500 text-white hover:text-white"
            )}
          >
            آخر تحديث: {formatArabicDate(updated_at)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 text-sm text-gray-700">
        {SUMMARY_FIELDS.map(({ label, value, icon: Icon }, index) => (
          <div key={index} className="flex flex-col items-start gap-2">
            <span className="flex flex-row gap-1 items-center font-medium text-md">
              <Icon className="w-6 h-5 text-gray-500" />
              {label}
            </span>
            <Input value={value} readOnly />
          </div>
        ))}

        <div className="flex flex-col items-start gap-2">
          <span className="flex flex-row gap-1 items-center font-medium text-md">
            <FiEdit className="w-6 h-5 text-gray-500" />
            نص الملاحظة
          </span>
          <Textarea
            readOnly
            value={content.repeat(3)}
            className="h-32 max-h-32 overflow-y-auto resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSummary;
