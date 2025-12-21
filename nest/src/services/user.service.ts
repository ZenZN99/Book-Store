import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';
import { generateToken } from '../utils/token';
import { RegisterDto } from '../dtos/user/register.dto';
import { LoginDto } from 'src/dtos/user/login.dto';
import cloudinary from 'src/utils/cloudinary';
import streamifier from 'streamifier';
import { UpdateProfileResponse } from 'src/dtos/user/profile.dto';
import mongoose, { Types } from 'mongoose';
@Injectable()
export class UserService {
  async register(dto: RegisterDto) {
    const { fullname, email, password, confirmPassword } = dto;


    const existsUser = await User.findOne({ email });
    if (existsUser) {
      throw new UnauthorizedException('البريد الإلكتروني مسجل مسبقًا');
    }

    const hashedPassword = await bcrypt.hash(password, 13);

    const isAdmin =
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD;

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      balance: 0,
      avatar:
        'https://res.cloudinary.com/dgagbheuj/image/upload/v1763194734/avatar-default-image_yc4xy4.jpg',
      cover:
        'https://res.cloudinary.com/dgagbheuj/image/upload/v1763194811/cover-default-image_uunwq6.jpg',
      role: isAdmin ? 'Admin' : 'User',
    });

    const token = generateToken(newUser._id.toString());

    return {
      success: 'تم إنشاء الحساب بنجاح',
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        avatar: newUser.avatar,
        cover: newUser.cover,
        role: newUser.role,
        balance: newUser.balance,
      },
      token,
    };
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestException('البريد غير مسجل');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('كلمة المرور خاطئة');
    }

    const token = generateToken(user._id.toString());

    return {
      success: 'تم تسجيل الدخول بنجاح',
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        avatar: user.avatar,
        cover: user.cover,
        role: user.role,
        balance: user.balance,
      },
      token,
    };
  }

  async me(userId: Types.ObjectId) {
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundException('المستخدم غير موجود');
    }

    return {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      cover: user.cover,
      balance: user.balance,
    };
  }

  async updateProfile(
    user: IUser,
    files: { avatar?: Express.Multer.File[]; cover?: Express.Multer.File[] },
  ): Promise<UpdateProfileResponse> {
    if (!user) {
      throw new UnauthorizedException('غير مصرح لك بالوصول');
    }

    const avatarFile = files?.avatar?.[0];
    const coverFile = files?.cover?.[0];

    const updatedData: any = {};

    const extractPublicId = (url: string) => {
      const parts = url.split('/');
      const file = parts.pop()!;
      return file.split('.')[0];
    };

    const uploadToCloudinary = (file: Express.Multer.File, folder: string) => {
      return new Promise<any>((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { folder },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          },
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    };

    if (avatarFile) {
      if (user.avatar?.includes('res.cloudinary.com')) {
        const oldId = extractPublicId(user.avatar);
        await cloudinary.v2.uploader.destroy(`users/avatars/${oldId}`);
      }

      const avatarUpload = await uploadToCloudinary(
        avatarFile,
        'users/avatars',
      );
      updatedData.avatar = avatarUpload.secure_url;
    }

    if (coverFile) {
      if (user.cover?.includes('res.cloudinary.com')) {
        const oldId = extractPublicId(user.cover);
        await cloudinary.v2.uploader.destroy(`users/covers/${oldId}`);
      }

      const coverUpload = await uploadToCloudinary(coverFile, 'users/covers');
      updatedData.cover = coverUpload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      throw new NotFoundException('المستخدم غير موجود');
    }

    return {
      success: 'تم تحديث الملف الشخصي بنجاح',
      user: {
        _id: updatedUser._id.toString(),
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        cover: updatedUser.cover,
        role: updatedUser.role,
        balance: updatedUser.balance,
      },
    };
  }
 
  async getAllUsers(authUser: IUser) {
    if (!authUser) {
      throw new UnauthorizedException('غير مصرح لك بالوصول');
    }
    const users = await User.find().sort({ createdAt: -1 });
    return users;
  }

  async getUserById(authUser: IUser, id: string) {
    if (!authUser) {
      throw new UnauthorizedException('غير مصرح لك بالوصول');
    }

    if (!id) {
      throw new UnauthorizedException('غير مصرح لك بالوصول');
    }

    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundException('المستخدم غير موجود');
    }

    return user;
  }

  async deleteUserById(authUser: IUser, userId: string) {
    if (!authUser) {
      throw new UnauthorizedException('غير مصرح لك بالوصول');
    }

    if (authUser.role !== 'Admin') {
      throw new UnauthorizedException('ممنوع: المسؤولين فقط');
    }

    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (!deletedUser) {
      throw new NotFoundException('المستخدم غير موجود');
    }

    return { success: 'تم حذف المستخدم بنجاح', user: deletedUser };
  }
}



