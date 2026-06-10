import Image from "next/image";
import Link from "next/link";
import ExpandableBio from "@/components/ExpandableBio";

export const metadata = {
  title: "Instructors",
  description:
    "Meet the instructors at Boomerang Pilates — Emilie Young, Annie Young, and Emma Rose Farmer. Classical Pilates instruction in Durham, NC.",
};

// Shared instructor block. Portrait + name + pronouns + role + bio + book CTA.
function InstructorBlock({
  name,
  pronouns,
  role,
  image,
  imageObjectPosition = "center",
  imageScale,
  children,
}: {
  name: string;
  pronouns: string;
  role: string;
  image: string;
  imageObjectPosition?: string;
  imageScale?: number;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative aspect-[4/5] max-w-md mx-auto overflow-hidden mb-6 bg-warm-white">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-700"
          style={{
            objectPosition: imageObjectPosition,
            transform: imageScale ? `scale(${imageScale})` : undefined,
          }}
        />
      </div>
      <div className="max-w-md mx-auto text-center sm:text-left">
        <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-3 gap-y-1 mb-1">
          <h3 className="font-serif text-2xl font-light text-charcoal">{name}</h3>
          <span className="text-[10px] tracking-[0.2em] uppercase text-accent/80 border border-accent/30 rounded-full px-2 py-0.5 leading-none">
            {pronouns}
          </span>
        </div>
        <p className="text-sm tracking-widest uppercase text-accent mb-4">{role}</p>
        <ExpandableBio>{children}</ExpandableBio>
        <Link
          href="/privates"
          className="btn-animated inline-block mt-3 bg-accent text-white text-sm tracking-widest uppercase px-7 py-3.5 hover:bg-accent/90 transition-colors"
        >
          Book a Session with {name.split(" ")[0]} →
        </Link>
      </div>
    </div>
  );
}

export default function Instructors() {
  return (
    <>
      {/* Header */}
      <section className="pt-28 lg:pt-36 pb-12 lg:pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-4">
            Our Team
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight">
            Meet your instructors.
          </h1>
          <p className="font-serif italic text-base text-charcoal/70 mt-6 max-w-xl mx-auto">
            Classically trained. Patient with the journey. Here to meet you
            exactly where you are.
          </p>
        </div>
      </section>

      {/* Instructor bios */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-10 lg:gap-12 items-start">
          {/* Emilie */}
          <InstructorBlock
            name="Emilie Young"
            pronouns="She/Her"
            role="Founder / Owner"
            image="/emilie-young.jpg"
            imageObjectPosition="center 22%"
            imageScale={1.4}
          >
            <p className="text-base text-muted leading-relaxed mb-4">
              Emilie founded Boomerang Pilates on the belief that everyone
              should be able to experience the benefits of classical Pilates.
              She experienced firsthand how Pilates improved her posture and
              lessened the neck and back pain that she had endured since
              childhood. Her practice rewired her relationship to exercise and
              movement and was the &ldquo;ah ha&rdquo; moment that helped her
              understand what it meant to feel strong, supported, and connected
              to her body. Whoever you are, wherever you are in your Pilates
              journey, Emilie is here to meet you where you&apos;re at and help
              you have your &ldquo;ah ha&rdquo; moment with movement too.
            </p>
            <p className="text-base text-muted leading-relaxed mb-4">
              Emilie is a 3rd generation classical Pilates instructor, lineaged
              through Romana Kryzanowska by way of her mentors, Marianne Adams
              and Rebecca Quinn. She completed her 600-hour comprehensive
              certification at Appalachian State University in 2014. Since
              then she has had opportunities to work with a variety of clients
              from professional athletes to polo players, post-partum mothers,
              and clientele with physical limitations or in various stages of
              injury rehabilitation. Also an elementary art teacher in the
              Durham Public School system, Emilie is an educator through and
              through.
            </p>
            <p className="text-base text-muted leading-relaxed mb-4">
              She brings the same sense of patience, open-mindedness, and
              playfulness to the studio that she brings to the classroom. She
              believes firmly in continual education and is inspired to create
              a studio where teachers can learn too. She strives to build
              relationships of trust and care with her clients and feels
              immensely honored to carry on the work of Joseph Pilates, helping
              her clients grow stronger through the method. Emilie has long
              dreamed of creating an inclusive, community-oriented classical
              Pilates studio, and she can&apos;t wait to welcome you to
              Boomerang.
            </p>
          </InstructorBlock>

          {/* Annie */}
          <InstructorBlock
            name="Annie Young"
            pronouns="She/Her"
            role="Co-Founder / Studio Manager"
            image="/annie-young.jpg"
            imageObjectPosition="center 22%"
            imageScale={1.55}
          >
            <p className="text-base text-muted leading-relaxed mb-4">
              Annie, a co-founder of Boomerang Pilates and a dedicated dancer,
              has always been passionate about movement. For years she pushed
              her body to its limits, unaware that she was silently battling
              hypermobile Ehlers-Danlos Syndrome. While her joint hypermobility
              made it appear that dance came naturally, she felt disconnected
              from her body, unaware how to engage the right muscles. For years
              she believed that constant pain was a normal part of movement.
              Learning the classical Pilates method at Appalachian State
              University brought her to her own &ldquo;ah-ha&rdquo; moment.
              Movement is meant to feel good.
            </p>
            <p className="text-base text-muted leading-relaxed mb-4">
              Pilates has become a powerful tool for Annie, helping her develop
              newfound strength, stability, and coordination. This method has
              taught her that pain is not an unavoidable partner of movement,
              but rather a signal that something requires more attention.
              Living with the unpredictability of hypermobile Ehlers-Danlos
              Syndrome, Annie&apos;s Pilates practice continues to offer a
              supportive system, enabling her to learn how to listen, trust,
              and nurture her body.
            </p>
            <p className="text-base text-muted leading-relaxed mb-4">
              Annie earned a BA in Dance Studies and completed her 600-hour
              comprehensive classical Pilates certification under the lineage
              of Romana Kryzanowska, guided by the mentorship of Marianne Adams
              and Rebecca Quinn at Appalachian State University. She is
              passionate about preserving the integrity and essence of Joseph
              Pilates&apos; work while evolving to meet contemporary needs. By
              incorporating modern ethics and biomechanics into her teaching,
              she aims to make the method as inclusive and empowering as it is
              true to the classical principles of Pilates: breath, control,
              center, concentration, precision, and flow.
            </p>
            <p className="text-base text-muted leading-relaxed mb-4">
              Her journey with Pilates stands as a testament to its inclusivity
              and adaptability, providing a sense of empowerment to individuals
              from all walks of life. Annie believes that anyone, regardless of
              their personal challenges, can discover strength and stability
              through the art of Pilates.
            </p>
          </InstructorBlock>

          {/* Emma Rose */}
          <InstructorBlock
            name="Emma Rose Farmer"
            pronouns="She/They"
            role="Instructor"
            image="/emma-rose-farmer.jpg"
            imageObjectPosition="center 25%"
          >
            <p className="text-base text-muted leading-relaxed mb-4">
              Born and raised in Durham, North Carolina, Emma Rose spent her
              formative years immersed in the vibrant dance community of the
              Triangle. She later attended Appalachian State University, where
              she earned degrees in Communications and Dance Studies. In the
              summer of 2025, she completed the Appalachian State Pilates
              Teacher Training Program, becoming a certified third-generation
              Classical Pilates instructor.
            </p>
            <p className="text-base text-muted leading-relaxed mb-4">
              Emma has long been passionate about using movement as a pathway
              to physical and mental well-being. Her introduction to Pilates
              came through dance during college, and the practice has had a
              profound impact on her life. Through consistent Pilates training,
              she has experienced significant relief from asthma, scoliosis,
              early arthritic symptoms, and previous dance-related injuries,
              supporting her ongoing rehabilitation and overall health.
            </p>
            <p className="text-base text-muted leading-relaxed mb-4">
              Dedicated to making Pilates accessible to all, Emma believes the
              method is for everyone, regardless of age, ability, or physical
              condition. Having personally experienced its restorative
              benefits, she is committed to sharing those benefits with her
              community. Emma strives to create a welcoming and supportive
              environment where clients can pursue their individual goals
              through mindful movement, fostering strength, balance, and
              lasting well-being.
            </p>
          </InstructorBlock>
        </div>
      </section>
    </>
  );
}
