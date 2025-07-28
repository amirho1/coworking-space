import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/lib/utils";
import { Icon } from "@iconify/react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-slate-900">دیجی نکست</h1>
                <p className="text-xs text-slate-600">فضای کار اشتراکی</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link href="/login">
                <Button variant="ghost" className="text-slate-700 hover:text-slate-900">
                  ورود
                </Button>
              </Link>
              <Link href={routes.register}>
                <Button>ثبت نام</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            فضای کار مدرن برای
            <span className="text-blue-600 block">آینده‌سازان</span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            در دیجی نکست، محیطی حرفه‌ای و انگیزه‌بخش برای کار، همکاری و رشد کسب‌وکار شما فراهم
            کرده‌ایم. با امکانات مدرن و جامعه‌ای از متخصصان، تجربه‌ای متفاوت از کار را آغاز کنید.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className=" text-lg px-8 py-3">
              بازدید رایگان
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
              مشاهده قیمت‌ها
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">امکانات و خدمات</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              تمام آنچه برای یک محیط کار مدرن و بهره‌ور نیاز دارید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon icon="mdi:wifi" className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>اینترنت پرسرعت</CardTitle>
                <CardDescription>اتصال فیبر نوری با سرعت بالا و پایداری ۹۹.۹٪</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon icon="mdi:users" className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>اتاق‌های جلسه</CardTitle>
                <CardDescription>اتاق‌های مجهز با تجهیزات ارائه و ویدئو کنفرانس</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon icon="mdi:coffee" className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>کافه و آشپزخانه</CardTitle>
                <CardDescription>قهوه تازه، چای و تنقلات رایگان در تمام ساعات کاری</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon icon="mdi:clock" className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>دسترسی ۲۴/۷</CardTitle>
                <CardDescription>
                  امکان کار در تمام ساعات شبانه‌روز با سیستم امنیتی پیشرفته
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon icon="mdi:shield" className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>امنیت بالا</CardTitle>
                <CardDescription>
                  سیستم کنترل تردد، دوربین مداربسته و نگهبانی ۲۴ ساعته
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon icon="mdi:zap" className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>فضای انعطاف‌پذیر</CardTitle>
                <CardDescription>میز‌های قابل تنظیم، فضای کار باز و اتاق‌های خصوصی</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">پلان‌های عضویت</h3>
            <p className="text-slate-600">برای هر نیاز، راه‌حلی مناسب</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-center">روزانه</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">۱۵۰,۰۰۰</span>
                  <span className="text-slate-600"> تومان/روز</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full ml-3"></span>
                    دسترسی به فضای کار مشترک
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full ml-3"></span>
                    اینترنت پرسرعت
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full ml-3"></span>
                    قهوه و چای رایگان
                  </li>
                </ul>
                <Button className="w-full mt-6">انتخاب پلان</Button>
              </CardContent>
            </Card>

            <Card className="relative border-blue-500 border-2">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                محبوب‌ترین
              </Badge>
              <CardHeader>
                <CardTitle className="text-center">ماهانه</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">۲,۵۰۰,۰۰۰</span>
                  <span className="text-slate-600"> تومان/ماه</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full ml-3"></span>
                    تمام امکانات پلان روزانه
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full ml-3"></span>
                    ۱۰ ساعت اتاق جلسه رایگان
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full ml-3"></span>
                    کمد شخصی
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full ml-3"></span>
                    آدرس تجاری
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">انتخاب پلان</Button>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-center">سالانه</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">۲۰,۰۰۰,۰۰۰</span>
                  <span className="text-slate-600"> تومان/سال</span>
                </div>
                <Badge variant="secondary" className="mx-auto">
                  ۳۳٪ تخفیف
                </Badge>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full ml-3"></span>
                    تمام امکانات پلان ماهانه
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full ml-3"></span>
                    ۵۰ ساعت اتاق جلسه رایگان
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full ml-3"></span>
                    دسترسی به رویدادها
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full ml-3"></span>
                    مشاوره کسب‌وکار
                  </li>
                </ul>
                <Button className="w-full mt-6">انتخاب پلان</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">درباره دیجی نکست</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                دیجی نکست بیش از یک فضای کار اشتراکی است. ما جامعه‌ای از نوآوران، کارآفرینان و
                متخصصان هستیم که با هم برای ساختن آینده‌ای بهتر تلاش می‌کنیم.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                با بیش از ۵ سال تجربه در ارائه خدمات فضای کار اشتراکی، ما محیطی ایده‌آل برای رشد
                کسب‌وکارها و پروژه‌های نوآورانه فراهم کرده‌ایم.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">۵۰۰+</div>
                  <div className="text-slate-600">عضو فعال</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">۱۰۰+</div>
                  <div className="text-slate-600">استارتاپ موفق</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-lg p-8">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="فضای کار دیجی نکست"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">تماس با ما</h3>
            <p className="text-slate-600">برای کسب اطلاعات بیشتر یا بازدید از فضای کار</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Icon icon="mdi:map-marker" className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>آدرس</CardTitle>
                <CardDescription>
                  تهران، خیابان ولیعصر، پلاک ۱۲۳۴
                  <br />
                  طبقه ۵، واحد ۱۰
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Icon icon="mdi:phone" className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>تلفن</CardTitle>
                <CardDescription>
                  ۰۲۱-۱۲۳۴۵۶۷۸
                  <br />
                  ۰۹۱۲-۳۴۵۶۷۸۹
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Icon icon="mdi:email" className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>ایمیل</CardTitle>
                <CardDescription>
                  info@diginext.ir
                  <br />
                  support@diginext.ir
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">دیجی نکست</h4>
              <p className="text-slate-400 text-sm">
                فضای کار اشتراکی مدرن برای آینده‌سازان و نوآوران
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">خدمات</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>فضای کار مشترک</li>
                <li>اتاق‌های جلسه</li>
                <li>دفتر اختصاصی</li>
                <li>آدرس تجاری</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">لینک‌های مفید</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>درباره ما</li>
                <li>قیمت‌ها</li>
                <li>رویدادها</li>
                <li>وبلاگ</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">ساعات کاری</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>شنبه تا چهارشنبه: ۸-۲۲</li>
                <li>پنج‌شنبه: ۸-۲۰</li>
                <li>جمعه: تعطیل</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; ۱۴۰۳ دیجی نکست. تمام حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
