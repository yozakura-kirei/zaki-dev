import ErrorMessage from '@/components/atoms/ErrorMessage';
import H2Tag from '@/components/atoms/H2Tag';
import MiniCard from '@/components/atoms/MiniCard';
import MiniLabel from '@/components/atoms/MiniLabel';
import MetaData from '@/components/organisms/MetaData';
import PageWrapper from '@/components/templates/PageWrapper';
import { API, PATH } from '@/utils/common/path';
import { Description } from '@/utils/common/site';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormType {
  name: string;
  email: string;
  contact_detail: string;
  is_personal_info: boolean;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const [step, setStep] = useState<number>(0);
  const [contactData, setContactData] = useState<FormType>({
    name: '',
    email: '',
    contact_detail: '',
    is_personal_info: false,
  });

  async function submitContact() {
    // 問い合わせ内容をDBに保存
    const res = await fetch(API.INSERT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    if (res.ok) {
      const { isError, isSave } = await res.json();
      if (isSave) {
        setStep(2);
      }
    }
  }

  return (
    <>
      <MetaData
        isTitle={false}
        title='お問い合わせ'
        description={Description.basic}
      />
      {step === 0 && (
        <PageWrapper isGrid={false}>
          <H2Tag headingText='お問い合わせ' isMore={false} />
          <div className='my-6'>
            <form
              onSubmit={handleSubmit((data) => {
                // 問い合わせデータをセット
                setContactData({
                  name: data.name,
                  email: data.email,
                  contact_detail: data.contact_detail,
                  is_personal_info: data.is_personal_info ? true : false,
                });
                setStep(1);
              })}
            >
              <div className='flex flex-col my-4'>
                <label className='text-[0.9rem] font-semibold'>お名前</label>
                <input
                  type='text'
                  {...register('name', {
                    required: 'お名前の入力は必須です',
                  })}
                  placeholder='お名前'
                  className='border-2 p-2 rounded-xl'
                />
                {errors.name && (
                  <ErrorMessage text={errors.name.message as string} />
                )}
              </div>
              <div className='flex flex-col my-4'>
                <label className='text-[0.9rem] font-semibold'>
                  メールアドレス
                </label>
                <input
                  type='email'
                  {...register('email', {
                    required: 'メールアドレスの入力は必須です',
                  })}
                  placeholder='メールアドレス'
                  className='border-2 p-2 rounded-xl'
                />
                {errors.email && (
                  <ErrorMessage text={errors.email.message as string} />
                )}
              </div>
              <div className='flex flex-col my-4'>
                <label className='text-[0.9rem] font-semibold'>
                  お問い合わせ内容
                </label>
                <textarea
                  // type='text'
                  {...register('contact_detail', {
                    required: 'お問い合わせ内容の入力は必須です',
                  })}
                  placeholder='お問い合わせ内容'
                  className='border-2 p-2 rounded-xl h-[250px]'
                />
                {errors.contact_detail && (
                  <ErrorMessage
                    text={errors.contact_detail.message as string}
                  />
                )}
              </div>
              <div className='my-6'>
                <input
                  id='personalInfo'
                  type='checkbox'
                  {...register('is_personal_info', {
                    required: '個人情報の取り扱いについて確認は必須です',
                  })}
                  value='個人情報の取り扱いについて確認しました'
                />
                <label htmlFor='personalInfo' className='ml-4 text-[0.9rem]'>
                  <Link
                    href={'/c/privacy'}
                    rel='noopener noreferrer'
                    target='_blank'
                    className='text-blue-600 font-semibold border-b-2 border-blue-600'
                  >
                    個人情報の取り扱い
                  </Link>
                  について確認しました
                </label>
                {errors.is_personal_info && (
                  <ErrorMessage
                    text={errors.is_personal_info.message as string}
                  />
                )}
              </div>
              <button
                type='submit'
                className='bg-blue-600 text-White py-2 px-6 rounded-xl hover:opacity-80'
              >
                確認画面へ
              </button>
            </form>
          </div>
        </PageWrapper>
      )}
      {step === 1 && (
        <PageWrapper>
          <H2Tag headingText='確認画面' isMore={false} />
          <section>
            <div className='py-4'>
              <p>下記のお問い合わせ内容でよろしいでしょうか？</p>
            </div>
            <div className='pt-4 pb-8'>
              <ul>
                <li className='py-4'>
                  <MiniLabel text='お名前' />
                  {contactData.name}
                </li>
                <li className='py-4'>
                  <MiniLabel text='メールアドレス' />
                  {contactData.email}
                </li>
                <li className='py-4 whitespace-pre'>
                  <MiniLabel text='お問い合わせ内容' />
                  <br />
                  <div className='mt-4'>{contactData.contact_detail}</div>
                </li>
              </ul>
            </div>
            <button
              type='submit'
              className='bg-gray-600 text-White py-2 px-6 rounded-xl mr-4 hover:opacity-80'
              onClick={() => setStep(0)}
            >
              戻る
            </button>
            <button
              type='submit'
              className='bg-blue-600 text-White py-2 px-6 rounded-xl hover:opacity-80'
              onClick={submitContact}
            >
              問い合わせる
            </button>
          </section>
        </PageWrapper>
      )}
      {step === 2 && (
        <PageWrapper isGrid={false}>
          <H2Tag headingText='お問い合わせ完了' isMore={false} />
          <section className='my-6'>
            <p className='my-8'>
              お問い合わせいただきありがとうございました。
              <br />
              いただいたお問い合わせは必要に応じて順次対応・参考とさせていただきます。
            </p>
            <Link href={PATH.ROOT} className='w-[12rem] text-center my-4'>
              <MiniCard categoryName='トップページへ戻る' />
            </Link>
          </section>
        </PageWrapper>
      )}
    </>
  );
}
