export type Locale = "en" | "hi" | "es" | "ru";

export interface IItranslationsContent {
  title: string;
  description: string;
  content: string;
  thankyou: string;
}
export type ItranslationsLang = Record<Locale, IItranslationsContent>;

export const translations: ItranslationsLang = {
  en: {
    title: "About Us",
    description:
      "Welcome to our platform. We are dedicated to providing the best service and experience to our users worldwide.",
    content: `Our mission is to innovate and deliver solutions that make a difference. With a passionate team of professionals, we strive to create products that are user-centric, scalable, and secure.`,
    thankyou: "Thank you for being part of our journey.",
  },
  hi: {
    title: "हमारे बारे में",
    description:
      "हमारे प्लेटफॉर्म में आपका स्वागत है। हम विश्वव्यापी अपने उपयोगकर्ताओं के लिए सर्वोत्तम सेवा और अनुभव प्रदान करने के लिए समर्पित हैं।",
    content: `हमारा लक्ष्य नवाचार करना और ऐसे समाधान प्रदान करना है जो फर्क लाएं। पेशेवरों की एक भावुक टीम के साथ, हम ऐसे उत्पाद बनाने का प्रयास करते हैं जो उपयोगकर्ता-केंद्रित, मापनीय और सुरक्षित हों।`,
    thankyou: "हमारी यात्रा का हिस्सा बनने के लिए धन्यवाद।",
  },
  es: {
    title: "Sobre Nosotros",
    description:
      "Bienvenido a nuestra plataforma. Estamos dedicados a proporcionar el mejor servicio y experiencia a nuestros usuarios en todo el mundo.",
    content: `Nuestra misión es innovar y entregar soluciones que marquen la diferencia. Con un equipo apasionado de profesionales, nos esforzamos por crear productos que sean centrados en el usuario, escalables y seguros.`,
    thankyou: "Gracias por ser parte de nuestro viaje.",
  },
  ru: {
    title: "О нас",
    description:
      "Добро пожаловать на нашу платформу. Мы посвящены предоставлению наилучшего сервиса и опыта нашим пользователям во всем мире.",
    content: `Наша миссия - инновировать и предоставлять решения, которые имеют значение. С увлеченной командой профессионалов мы стремимся создавать продукты, которые ориентированы на пользователя, масштабируемы и безопасны.`,
    thankyou: "Спасибо, что являетесь частью нашего пути.",
  },
};
